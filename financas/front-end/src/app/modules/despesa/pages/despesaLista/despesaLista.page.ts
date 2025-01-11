import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabControl } from 'src/app/core/matTabControl';
import { Utils } from 'src/app/core/utils';
import { DespesaService } from 'src/app/services/despesa.service';
import { ElementoOrganizacionalService } from 'src/app/services/elementoOrganizacional.service';
//import { Router } from '@angular/router';

@Component({
  styleUrls: ['./despesaLista.page.scss'],
  templateUrl: './despesaLista.page.html'
})
export class DespesaListaPage {

  // ÁREA - OBJETOS, VARIÁVEIS E CONFIGURAÇÕES  ////

  idElemento: any = 0;
  formFiltro: FormGroup;
  
  descricaoDespesaFiltro: any[] = [];
  descricaoDespesaFiltroTodos: any[] = [];

  tipoPagamentoFiltro: any[] = [];
  tipoPagamentoFiltroTodos: any[] = [];
  
  despesaMensalFiltro: any[] = [];
  despesaMensalFiltroTodos: any[] = [];
  
  despesaAnualFiltro: any[] = [];
  despesaAnualFiltroTodos: any[] = [];

  resultadoFiltro: any[] = [];
  result: any;
  isLoading: boolean = true;


  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registros: any | undefined;

  //Configuração das colunas a serem exibidas na tabela de acordo com os dados retornados
  private colunasConfig = [

    {
      atributo: 'descricaoDespesa',
      titulo: 'Descrição da Despesa',
      innerHTML: (registro: any) => `${(registro.descricao)}`
    },
	{
      atributo: 'valor',
      titulo: 'Valor da despesa',
      innerHTML: (registro: any) => `${(registro.valor)}`
    },
	{
      atributo: 'tipoPagamento',
      titulo: 'Tipo de pagamento',
      innerHTML: (registro: any) => `${registro.tipoPagamento}`

    },
	{
      atributo: 'dataCriacao',
      titulo: 'Data da despesa',
      innerHTML: (registro: any) => this.utils.formatarData(`${(registro.dataCriacao)}`)
    }
    
  ];

  //Componente que controla o comportamento da matTable
  tabControl: MatTabControl = new MatTabControl(this.colunasConfig);

  /// FIM = ÁREA - OBJETOS, VARIÁVEIS E CONFIGURAÇÕES ///

 
  ///  CONSTRUTOR ///
  
  constructor(
    protected utils: Utils, /// 
    protected router: Router,
    //protected user: User,
    protected formBuilder: FormBuilder,
    protected service: DespesaService
  ) {
    this.formFiltro = this.criarForm();
    this.atualizarRegistros();

     //Tratamento Auto-Complete
     this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['despesa'],
       this.formFiltro.controls['idDespesa'], this.aplicarFiltroDescricaoDespesa.bind(this), 0);

     this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['tipoPagamento'],
       this.formFiltro.controls['idTipoPagamento'], this.aplicarFiltroTipoPagamento.bind(this), 0);

    this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['despesaMensal'],
       this.formFiltro.controls['idDespesaMensal'], this.aplicarFiltroDespesaMensal.bind(this), 0);
	   
	   this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['despesaAnual'],
       this.formFiltro.controls['idDespesaAnual'], this.aplicarFiltroDespesaAnual.bind(this), 0);
  }

  /// FIM CONSTRUTOR ///



  /// ÁREA fORMULÁRIO ///

  //Cria e retorna o Formgroup que será utilizado pela tela

  private criarForm(): FormGroup {
    return this.formBuilder.group(
      {
        despesa: [null, []],
        idDespesa: [null, []],
		
        tipoPagamento: [null, []],
        idTipoPagamento: [null, []],
		
		despesaMensal: [null, []],
        idDespesaMensal: [null, []],
		
		despesaAnual: [null, []],
        idDespesaAnual: [null, []]

      },
      { updateOn: "change" }
    );
  }

  //Retorna o registro utilizado pela tela
  get registro(): any[] {
    return this._registros;
  }
  /// FIM ÁREA fORMULÁRIO ///



  /// ÁREA DE FUNCIONALIDADES: BOTÕES, COMBOS, IMPUTS ETC... ///

  atualizarRegistros() {

    this.isLoading = true;


     this.service.ObterTodasDespesas().subscribe(result => {

      
       // Atributo que contem o registro a ser exibido pelo formulario.
       this._registros = result;
       this.descricaoDespesaFiltro = result;
       this.tipoPagamentoFiltro = result;
	   
	   this.despesaMensalFiltro = result;
       this.despesaAnualFiltro = result;
	   
       this.tipoPagamentoFiltroTodos = this.tipoPagamentoFiltro;
       this.descricaoDespesaFiltroTodos = this.descricaoDespesaFiltro;
	   
	   this.despesaMensalFiltroTodos = this.despesaMensalFiltro;
       this.despesaAnualFiltroTodos = this.despesaAnualFiltro;
	   
	   


       // Inicia o controle da matTable indicando as colunas a serem exibidas e a lista de registros  
       this.tabControl.registros = result;

       this.resultadoFiltro = result;

       this.isLoading = false;
     });
  }

  //Acao a ser executada quando o usuário solicita a inclusão de um novo registro
  inserir() {
    // Navega para a rela de cadastro no modo de inclusão(sem id)
    this.router.navigate(['despesa', 'cad']);
  }

  // Acao a ser executada quando o usuario solicita alteracao do registro selecionado
  alterar(pRegistro: any) {
    // Navega para a tela de cadastro no modo de alteracao(com id)
    this.router.navigate(['despesa', 'cad', pRegistro.id]);
  }

  // Acao a ser executada quando o usuario solicita exclusão do registro selecionado
  excluir(pRegistros: any[]) {
     this.service.ExcluirDespesa(pRegistros.map(obj => obj.id)).subscribe(result => {
       this.result = result
       this.utils.exibirSucesso(pRegistros.length > 1 ? 'Registros excluídos com sucesso.' : 'Registros excluídos com sucesso.');
       this.atualizarRegistros();
     });
  }

  /// FIM - ÁREA DE FUNCIONALIDADES: BOTÕES, COMBOS, IMPUTS ETC... /// 

 
 
  /// ÁREA DE REGRAS E PROCESSAMENTOS /// 

  showMsg() {
     this.utils.exibirWarning(
       "Selecione um usuário para prosseguir"
     );
  }

  ngOnInit(): void { }


  aplicarFiltroDescricaoDespesa(pDescricaoDespesa: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do ppa digitado pelo usuário
    this.descricaoDespesaFiltro = this.descricaoDespesaFiltroTodos.filter(f => {

      const despesaString = `${f.descricao}`;
      return despesaString.includes(pDescricaoDespesa);

    });

  }

  aplicarFiltroTipoPagamento(pTipoPagamento: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.tipoPagamentoFiltro = this.tipoPagamentoFiltroTodos.filter(f => {
      
      const tipoPagamentoString = `${f.tipoPagamento}`
      return tipoPagamentoString.includes(pTipoPagamento);

    });
  }
  
  aplicarFiltroDespesaMensal(pDespesaMensal: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.despesaMensalFiltro = this.despesaMensalFiltroTodos.filter(f => {
      
      const despesaMensalString = `${f.despesaMensal}`
      return despesaMensalString.includes(pDespesaMensal);

    });
  }
  
  aplicarFiltroDespesaAnual(pDespesaAnual: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.despesaAnualFiltro = this.despesaAnualFiltroTodos.filter(f => {
      
      const despesaAnualString = `${f.despesaAnual}`
      return despesaAnualString.includes(pDespesaAnual);

    });
  }

  aplicarFiltro(): void {
    this.resultadoFiltro = this.registro;
    const lDescricaoDespesa = this.formFiltro.controls['descricaoDespesa'].value;
    const lTipoPagamento = this.formFiltro.controls['tipoPagamento'].value;
	const lDespesaMensal = this.formFiltro.controls['despesaMensal'].value;
    const lDespesaAnual = this.formFiltro.controls['despesaAnual'].value;

    if (lDescricaoDespesa.descricao && lDescricaoDespesa) {

      const descricaoDespesaString = `${lDescricaoDespesa.descricao}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroDescricaoDespesaString = `${f.descricao}`;
        return registroDescricaoDespesaString.includes(descricaoDespesaString);
      });

    }

    if (lTipoPagamento && lTipoPagamento.tipoPagamento) {
      const tipoPagamentoString = `${lTipoPagamento.tipoPagamento}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroTipoPagamentoString = `${(f.tipoPagamento)}`
        return registroTipoPagamentoString.includes(tipoPagamentoString);
      });

    }
	
	if (lDespesaMensal && lDespesaMensal.despesaMensal) {
      const despesaMensalString = `${lDespesaMensal.despesaMensal}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroDespesaMensalString = `${(f.despesaMensal)}`
        return registroDespesaMensalString.includes(despesaMensalString);
      });

    }
	
	if (lDespesaAnual && lDespesaAnual.despesaAnual) {
      const despesaAnualString = `${lDespesaAnual.despesaAnual}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroDespesaAnualString = `${(f.despesaAnual)}`
        return registroDespesaAnualString.includes(despesaAnualString);
      });

    }

    this.tabControl.registros = this.resultadoFiltro;

  }

  obterDescricaoDespesa(pDescricaoDespesa: any): any {
    return pDescricaoDespesa ? `${pDescricaoDespesa.descricao}`  : '';
  }

  obterTipoPagamento(pTipoPagamento: any): any {
    return pTipoPagamento ? `${pTipoPagamento.tipoPagamento}` : '';
  }

   obterDespesaMensal(pDespesaMensal: any): any {
    return pDespesaMensal ? `${pDespesaMensal.despesaMensal}` : '';
  }
  
  obterDespesaAnual(pDespesaAnual: any): any {
    return pDespesaAnual ? `${pDespesaAnual.despesaAnual}` : '';
  }

  public retiraCaracteresEspeciais(pTermo: any): string {
    return String(pTermo)
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  }

  /// FIM - ÁREA DE REGRAS E PROCESSAMENTOS ///

}

