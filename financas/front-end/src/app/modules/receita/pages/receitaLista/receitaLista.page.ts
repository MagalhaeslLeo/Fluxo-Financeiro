import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabControl } from 'src/app/core/matTabControl';
import { Utils } from 'src/app/core/utils';
import { ReceitaService } from 'src/app/services/receita.service';
import { ElementoOrganizacionalService } from 'src/app/services/elementoOrganizacional.service';
//import { Router } from '@angular/router';

@Component({
  styleUrls: ['./receitaLista.page.scss'],
  templateUrl: './receitaLista.page.html'
})
export class ReceitaListaPage {

  // ÁREA - OBJETOS, VARIÁVEIS E CONFIGURAÇÕES  ////

  idElemento: any = 0;
  formFiltro: FormGroup;
  
  descricaoReceitaFiltro: any[] = [];
  descricaoReceitaFiltroTodos: any[] = [];

  fonteDeRendaFiltro: any[] = [];
  fonteDeRendaFiltroTodos: any[] = [];
  
  receitaMensalFiltro: any[] = [];
  receitaMensalFiltroTodos: any[] = [];
  
  receitaAnualFiltro: any[] = [];
  receitaAnualFiltroTodos: any[] = [];

  resultadoFiltro: any[] = [];
  result: any;
  isLoading: boolean = true;


  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registros: any | undefined;

  //Configuração das colunas a serem exibidas na tabela de acordo com os dados retornados
  private colunasConfig = [

    {
      atributo: 'descricaoReceita',
      titulo: 'Descrição da receita',
      innerHTML: (registro: any) => `${(registro.descricao)}`
    },
    {
      atributo: 'valor',
      titulo: 'Valor da receita',
      innerHTML: (registro: any) => `${(registro.valor)}`
    },
    {
      atributo: 'fonteDeRenda',
      titulo: 'Fonte de renda',
      innerHTML: (registro: any) => `${(registro.fonteDeRenda)}`
    }
    ,
    {
      atributo: 'dataCriacao',
      titulo: 'Data da receita',
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
    protected service: ReceitaService
  ) {
    this.formFiltro = this.criarForm();
    this.atualizarRegistros();

     //Tratamento Auto-Complete
     this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['receita'],
       this.formFiltro.controls['idReceita'], this.aplicarFiltroDescricaoReceita.bind(this), 0);

    this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['fonteDeRenda'],
       this.formFiltro.controls['idFonteDeRenda'], this.aplicarFiltroReceitaMensal.bind(this), 0);

       this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['receitaMensal'],
        this.formFiltro.controls['idReceitaMensal'], this.aplicarFiltroReceitaMensal.bind(this), 0);
       
       this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['receitaAnual'],
       this.formFiltro.controls['idReceitaAnual'], this.aplicarFiltroReceitaAnual.bind(this), 0);
  }

  /// FIM CONSTRUTOR ///



  /// ÁREA fORMULÁRIO ///

  //Cria e retorna o Formgroup que será utilizado pela tela

  private criarForm(): FormGroup {
    return this.formBuilder.group(
      {
        receita: [null, []],
        idReceita: [null, []],

        fonteDeRenda: [null, []],
        idFonteDeRenda: [null, []],
        
        receitaMensal: [null, []],
        idReceitaMensal: [null, []],
        
        receitaAnual: [null, []],
        idReceitaAnual: [null, []]

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


     this.service.ObterTodasReceitas().subscribe(result => {

      
       // Atributo que contem o registro a ser exibido pelo formulario.
       this._registros = result;
       this.descricaoReceitaFiltro = result;
       this.fonteDeRendaFiltro = result;
       this.receitaMensalFiltro = result;
       this.receitaAnualFiltro = result;
       
       this.descricaoReceitaFiltroTodos = this.descricaoReceitaFiltro;
       this.fonteDeRendaFiltroTodos = this.fonteDeRendaFiltro;
       this.receitaMensalFiltroTodos = this.receitaMensalFiltro;
       this.receitaAnualFiltroTodos = this.receitaAnualFiltro;
       
       


       // Inicia o controle da matTable indicando as colunas a serem exibidas e a lista de registros  
       this.tabControl.registros = result;

       this.resultadoFiltro = result;

       this.isLoading = false;
     });
  }

  //Acao a ser executada quando o usuário solicita a inclusão de um novo registro
  inserir() {
    // Navega para a rela de cadastro no modo de inclusão(sem id)
    this.router.navigate(['receita', 'det']);
  }

  // Acao a ser executada quando o usuario solicita alteracao do registro selecionado
  alterar(pRegistro: any) {
    // Navega para a tela de cadastro no modo de alteracao(com id)
    this.router.navigate(['receita', 'det', pRegistro.id]);
  }

  // Acao a ser executada quando o usuario solicita exclusão do registro selecionado
  excluir(pRegistros: any[]) {
     this.service.ExcluirReceita(pRegistros.map(obj => obj.id)).subscribe(result => {
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


  aplicarFiltroDescricaoReceita(pDescricaoReceita: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do ppa digitado pelo usuário
    this.descricaoReceitaFiltro = this.descricaoReceitaFiltroTodos.filter(f => {

      const receitaString = `${f.descricao}`;
      return receitaString.includes(pDescricaoReceita);

    });

  }

  aplicarFiltroFonteDeRenda(pFonteDeRenda: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.fonteDeRendaFiltro = this.fonteDeRendaFiltroTodos.filter(f => {
      
      const fonteDeRendaString = `${f.fonteDeRenda}`
      return fonteDeRendaString.includes(pFonteDeRenda);

    });
  }
  
  aplicarFiltroReceitaMensal(pReceitaMensal: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.receitaMensalFiltro = this.receitaMensalFiltroTodos.filter(f => {
      
      const receitaMensalString = `${f.receitaMensal}`
      return receitaMensalString.includes(pReceitaMensal);

    });
  }
  
  aplicarFiltroReceitaAnual(pReceitaAnual: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.receitaAnualFiltro = this.receitaAnualFiltroTodos.filter(f => {
      
      const receitaAnualString = `${f.receitaAnual}`
      return receitaAnualString.includes(pReceitaAnual);

    });
  }

  aplicarFiltro(): void {
    this.resultadoFiltro = this.registro;
    const lDescricaoReceita = this.formFiltro.controls['descricaoReceita'].value;
    const lFonteDeRenda = this.formFiltro.controls['fonteDeRenda'].value;
    const lReceitaMensal = this.formFiltro.controls['receitaMensal'].value;
    const lReceitaAnual = this.formFiltro.controls['receitaAnual'].value;

    if (lDescricaoReceita.descricao && lDescricaoReceita) {

      const descricaoReceitaString = `${lDescricaoReceita.descricao}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroDescricaoReceitaString = `${f.descricao}`;
        return registroDescricaoReceitaString.includes(descricaoReceitaString);
      });

    }

    if (lFonteDeRenda.fonteDeRenda && lFonteDeRenda) {

      const fonteDeRendaString = `${lDescricaoReceita.descricao}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroFonteDeRendaString = `${f.fonteDeRenda}`;
        return registroFonteDeRendaString.includes(fonteDeRendaString);
      });

    }
    
    if (lReceitaMensal && lReceitaMensal.receitaMensal) {
      const receitaMensalString = `${lReceitaMensal.receitaMensal}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroReceitaMensalString = `${(f.receitaMensal)}`
        return registroReceitaMensalString.includes(receitaMensalString);
      });

    }
    
    if (lReceitaAnual && lReceitaAnual.receitaAnual) {
      const receitaAnualString = `${lReceitaAnual.receitaAnual}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroReceitaAnualString = `${(f.receitaAnual)}`
        return registroReceitaAnualString.includes(receitaAnualString);
      });

    }

    this.tabControl.registros = this.resultadoFiltro;

  }

  obterDescricaoReceita(pDescricaoReceita: any): any {
    return pDescricaoReceita ? `${pDescricaoReceita.descricao}`  : '';
  }

   obterReceitaMensal(pReceitaMensal: any): any {
    return pReceitaMensal ? `${pReceitaMensal.receitaMensal}` : '';
  }

  obterFonteDeRenda(pFonteDeRenda: any): any {
    return pFonteDeRenda ? `${pFonteDeRenda.fonteDeRenda}` : '';
  }

  obterReceitaAnual(pReceitaAnual: any): any {
    return pReceitaAnual ? `${pReceitaAnual.receitaAnual}` : '';
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

