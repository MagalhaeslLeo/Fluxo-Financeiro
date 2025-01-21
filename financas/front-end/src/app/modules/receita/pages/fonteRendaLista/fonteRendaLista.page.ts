import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabControl } from 'src/app/core/matTabControl';
import { Utils } from 'src/app/core/utils';
import { FonteRendaService } from 'src/app/services/fonteRenda.service';

@Component({
    selector: "fonteRendaListaPage",
    styleUrls: ['./fonteRendaLista.page.scss'],
    templateUrl: './fonteRendaLista.page.html'
})
export class FonteRendaListaPage {
    // ÁREA - OBJETOS, VARIÁVEIS E CONFIGURAÇÕES  ////
    idElemento: any = 0;
    formFiltro: FormGroup;

    descricaoFonteRendaFiltro: any[] = [];
    descricaoFonteRendaFiltroTodos: any[] = [];

    dataCriacaoFiltro: any[] = [];
    dataCriacaoFiltroTodos: any[] = [];

    resultadoFiltro: any[] = [];
    result: any;
    isLoading: boolean = true;

    //Atributo que contem o registro a ser exibido pelo formulario.
    private _registros: any | undefined;

    //Configuração das colunas a serem exibidas na tabela de acordo com os dados retornados
    private colunasConfig = [
        {
            atributo: 'descricaoFonteRenda',
            titulo: 'Descrição da fonte de renda',
            innerHTML: (registro: any) => `${(registro.descricao)}`
        },
        {
            atributo: 'dataCriacao',
            titulo: 'Data da fonte de renda',
            innerHTML: (registro: any) => this.utils.formatarData(`${(registro.dataCriacao)}`)
        }
    ];
    //Componente que controla o comportamento da matTable
    tabControl: MatTabControl = new MatTabControl(this.colunasConfig);
    /// FIM = ÁREA - OBJETOS, VARIÁVEIS E CONFIGURAÇÕES ///


    ///  CONSTRUTOR ///
    constructor(
        protected utils: Utils,
        protected router: Router,
        protected formBuilder: FormBuilder,
        protected service: FonteRendaService
    ) {
        this.formFiltro = this.criarForm();
        this.atualizarRegistros();

        //Tratamento Auto-Complete
        this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['fonteDeRenda'],
            this.formFiltro.controls['idFonteDeRenda'], this.aplicarFiltroDescricaoFonteRenda.bind(this), 0);

        this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['dataCriacao'],
            this.formFiltro.controls['idDataCriacao'], this.aplicarFiltroDataCriacao.bind(this), 0);
    }
    /// FIM CONSTRUTOR ///



    /// ÁREA fORMULÁRIO ///

    //Cria e retorna o Formgroup que será utilizado pela tela
    private criarForm(): FormGroup {
        return this.formBuilder.group(
            {
                fonteDeRenda: [null, []],
                idFonteDeRenda: [null, []],

                dataCriacao: [null, []],
                idDataCriacao: [null, []]
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


     this.service.ObterTodasFonteRendas().subscribe(result => {

      
       // Atributo que contem o registro a ser exibido pelo formulario.
       this._registros = result;
       this.descricaoFonteRendaFiltro = result;
       this.dataCriacaoFiltro = result;
       
       this.descricaoFonteRendaFiltroTodos = this.descricaoFonteRendaFiltro;
       this.dataCriacaoFiltroTodos = this.dataCriacaoFiltro;  

       // Inicia o controle da matTable indicando as colunas a serem exibidas e a lista de registros  
       this.tabControl.registros = result;

       this.resultadoFiltro = result;

       this.isLoading = false;
     });
  }

   //Acao a ser executada quando o usuário solicita a inclusão de um novo registro
   inserir() {
    // Navega para a rela de cadastro no modo de inclusão(sem id)
    this.router.navigate(['receita', 'fonteRendCad']);
  }

  // Acao a ser executada quando o usuario solicita alteracao do registro selecionado
  alterar(pRegistro: any) {
    // Navega para a tela de cadastro no modo de alteracao(com id)
    this.router.navigate(['receita', 'fonteRendCad', pRegistro.id]);
  }

  // Acao a ser executada quando o usuario solicita exclusão do registro selecionado
  excluir(pRegistros: any[]) {
     this.service.ExcluirFonteRenda(pRegistros.map(obj => obj.id)).subscribe(result => {
       this.result = result
       this.utils.exibirSucesso(pRegistros.length > 1 ? 'Registros excluídos com sucesso.' : 'Registros excluídos com sucesso.');
       this.atualizarRegistros();
     });
  }

  /// FIM - ÁREA DE FUNCIONALIDADES: BOTÕES, COMBOS, IMPUTS ETC... /// 

 
 
  /// ÁREA DE REGRAS E PROCESSAMENTOS ///

  showMsg() {
    this.utils.exibirWarning(
      "Selecione uma fonte de renda para prosseguir"
    );
 }

 ngOnInit(): void { }

 aplicarFiltroDescricaoFonteRenda(pDescricaoFonteRenda: any): void{
    this.descricaoFonteRendaFiltro = this.descricaoFonteRendaFiltroTodos.filter(f=> {
        const fonteRendaString = `${f.descricao}`;
        return fonteRendaString.includes(pDescricaoFonteRenda);
    })
 }
 aplicarFiltroDataCriacao(pDataCriacao: any): void{
    this.dataCriacaoFiltro = this.dataCriacaoFiltroTodos.filter(f=> {
        const dataCriacaoString = `${f.descricao}`;
        return dataCriacaoString.includes(pDataCriacao);
    })
 }
 aplicarFiltro(): void {
    this.resultadoFiltro = this.registro;
    const lDescricaoFonteRenda = this.formFiltro.controls['descricaoFonteRenda'].value;
    const lDataCriacao = this.formFiltro.controls['dataCriacao'].value;

    if (lDescricaoFonteRenda.descricao && lDescricaoFonteRenda) {

      const descricaoFonteRendaString = `${lDescricaoFonteRenda.descricao}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroDescricaoFonteRendaString = `${f.descricao}`;
        return registroDescricaoFonteRendaString.includes(descricaoFonteRendaString);
      });

    }
    
    if (lDataCriacao && lDataCriacao.dataCriacao) {
      const dataCriacaoString = `${lDataCriacao.dataCriacao}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroDataCriacaoString = `${(f.dataCriacao)}`
        return registroDataCriacaoString.includes(dataCriacaoString);
      });

    }

    this.tabControl.registros = this.resultadoFiltro;

  }
  obterDescricaoFonteRenda(pDescricaoFonteRenda: any):any{
    return pDescricaoFonteRenda ? `${pDescricaoFonteRenda.descricao}` : '';
  }
  obterDataCriacao(pDataCriacao: any):any{
    return pDataCriacao ? `${pDataCriacao.dataCriacao}` : '';
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