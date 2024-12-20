import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabControl } from 'src/app/core/matTabControl';
import { Utils } from 'src/app/core/utils';
//import { Router } from '@angular/router';

//DADOS PARA TESTES (MOCKADOS)
export interface PeriodicElement {
  nome: string;
  email: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {nome: 'Carlos Sérgio', email: 'cs@teste.com.br'},
  {nome: 'Leonardo Silva', email: 'leo@test.com'},
  {nome: 'Gabriel A. Silva', email: 'gab@test.com.br'},
  {nome: 'steven jobs', email: 'sj@test.com.br'},
  {nome: 'bill gates', email: 'bt@teste.com'},
];


@Component({
  styleUrls: ['./usuarioLista.page.scss'],
  templateUrl: './usuarioLista.page.html'
})
export class UsuarioListaPage {

  // ÁREA - OBJETOS, VARIÁVEIS E CONFIGURAÇÕES  ////

  idElemento: any = 0;
  formFiltro: FormGroup;
  usuarioFiltro: any[] = [];
  usuarioFiltroTodos: any[] = [];

  emailFiltro: any[] = [];
  emailFiltroTodos: any[] = [];
  permissao: any;

  resultadoFiltro: any[] = [];
  result: any;

  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registros: any | undefined;

  //Configuração das colunas a serem exibidas na tabela de acordo com os dados retornados
  private colunasConfig = [

    {
      atributo: 'nome',
      titulo: 'Nome do Usuario',
      innerHTML: (registro: any) => `${(registro.nome)}`
    },

    {
      atributo: 'email',
      titulo: 'Email do Usuário',
      innerHTML: (registro: any) => `${registro.email}`

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
    //protected service: AtoAlteracaoOrcamentariaService
  ) {
    this.formFiltro = this.criarForm();
    this.atualizarRegistros();

    // if (this.user.idElementoOrganizacional) {

    //   this.idElemento = this.user.idElementoOrganizacional;
    //   this.atualizarRegistros();

    // } else {

    //   this.showMsg();
    //   //this.utils.irParaHome();
    // }

     //Tratamento Auto-Complete
     this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['usuario'],
       this.formFiltro.controls['idUsuario'], this.aplicarFiltroUsuario.bind(this), 0);

     this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['email'],
       this.formFiltro.controls['idEmail'], this.aplicarFiltroEmail.bind(this), 0);

    
  }

  /// FIM CONSTRUTOR ///



  /// ÁREA fORMULÁRIO ///

  //Cria e retorna o Formgroup que será utilizado pela tela

  private criarForm(): FormGroup {
    return this.formBuilder.group(
      {
        usuario: [null, []],
        idUsuario: [null, []],
        email: [null, []],
        idEmail: [null, []]

      },
      { updateOn: "change" }
    );
  }

  //Retorna o registro utilizado pela tela
  get registros(): any[] {
    return this._registros;
  }
  /// FIM ÁREA fORMULÁRIO ///



  /// ÁREA DE FUNCIONALIDADES: BOTÕES, COMBOS, IMPUTS ETC... ///

  atualizarRegistros() {

    this.tabControl.registros = ELEMENT_DATA;
    this.usuarioFiltro = ELEMENT_DATA;
    this.emailFiltro = ELEMENT_DATA;
    this._registros = this.usuarioFiltro;
    this.emailFiltroTodos = ELEMENT_DATA;
    this.usuarioFiltroTodos = this.usuarioFiltro;

    // this.service.obterPorMunicipio(this.idElemento).subscribe(result => {

    
    //   // Atributo que contem o registro a ser exibido pelo formulario.
    //   this._registros = result;



    //   // Inicia o controle da matTable indicando as colunas a serem exibidas e a lista de registros  
    //   this.tabControl.registros = result;

    //   this.resultadoFiltro = result;

    //   this.ppaFiltro = result;
    //   this.ppaFiltro = Array.from(this.ppaFiltro.map(m => m.loa.ldo.ppa).reduce((acc, current) => {
    //     if (!acc.has(current.id)) { acc.set(current.id, current) } return acc;
    //   }, new Map()).values());

    //   this.ppaFiltro = this.ppaFiltro;
    //   this.ppaFiltroTodos = this.ppaFiltro;

    //   this.numeroFiltroLOA = result;
    //   this.numeroFiltroLOA = result.map((item: any) => {
    //     const anoPublicacao = new Date(item.loa.dataPublicacao).getFullYear();
    //     return {
    //       numero: item.loa.numero,
    //       anoPublicacao: anoPublicacao,
    //       id: item.id
    //     };
    //   });

    //   this.numeroFiltroLOA = Array.from(this.numeroFiltroLOA.map(m => m).reduce((acc, current) => {
    //     if (!acc.has(current.id)) { acc.set(current.id, current) } return acc;
    //   }, new Map()).values());

    //   this.numeroFiltroLOA = this.numeroFiltroLOA;
    //   this.numeroFiltroTodosLOA = this.numeroFiltroLOA;

    //   this.numeroFiltroInstrumento = result;
    //   this.numeroFiltroInstrumento = Array.from(this.numeroFiltroInstrumento.map(m => m).reduce((acc, current) => {
    //     if (!acc.has(current.id)) { acc.set(current.id, current) } return acc;
    //   }, new Map()).values());

    //   this.numeroFiltroInstrumento = this.numeroFiltroInstrumento;
    //   this.numeroFiltroInstrumentoTodos = this.numeroFiltroInstrumento;

    // });
  }

  //Acao a ser executada quando o usuário solicita a inclusão de um novo registro
  inserir() {
    // Navega para a rela de cadastro no modo de inclusão(sem id)
    this.router.navigate(['usuario', 'cad']);
  }

  // Acao a ser executada quando o usuario solicita alteracao do registro selecionado
  alterar(pRegistro: any) {
    // Navega para a tela de cadastro no modo de alteracao(com id)
    this.router.navigate(['usuario', 'cad', pRegistro.id]);
  }

  // Acao a ser executada quando o usuario solicita exclusão do registro selecionado
  excluir(pRegistros: any[]) {
    // this.service.excluir(pRegistros.map(obj => obj.id)).subscribe(result => {
    //   this.result = result
    //   this.utils.exibirSucesso(pRegistros.length > 1 ? 'Registros excluídos com sucesso.' : 'Registros excluídos com sucesso.');
    //   this.atualizarRegistros();
    // });
  }

  /// FIM - ÁREA DE FUNCIONALIDADES: BOTÕES, COMBOS, IMPUTS ETC... /// 

 
 
  /// ÁREA DE REGRAS E PROCESSAMENTOS /// 

  showMsg() {
    // this.utils.exibirWarning(
    //   "Selecione um Ente Federado para prosseguir"
    // );
  }

  ngOnInit(): void { }


  aplicarFiltroUsuario(pUsuario: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do ppa digitado pelo usuário
    this.usuarioFiltro = this.usuarioFiltroTodos.filter(f => {

      const usuarioString = `${f.nome} - ${f.email}`;
      return usuarioString.includes(pUsuario);

    });

  }

  aplicarFiltroEmail(pEmail: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.emailFiltro = this.emailFiltroTodos.filter(f => {
      
      const emailString = `${f.email}`
      return emailString.includes(pEmail);

    });
  }

  aplicarFiltro(): void {
    this.resultadoFiltro = this.registro;
    const lUsuario = this.formFiltro.controls['usuario'].value;
    const lEmail = this.formFiltro.controls['email'].value;

    if (lUsuario != undefined && lUsuario != '' && lUsuario != null) {

      const usuarioString = `${lUsuario.nome} - ${lUsuario.email}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroUsuarioString = `${f.nome} - ${f.email}`;
        return registroUsuarioString.includes(usuarioString);
      });

    }

    if (lEmail != undefined && lEmail != '' && lEmail != null) {
      const emailString = `${lEmail.email}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroEmailString = `${(f.email)}`
        return registroEmailString.includes(emailString);
      });

    }

    this.tabControl.registros = this.resultadoFiltro;

  }

  obterUsuario(pUsuario: any): any {
    return pUsuario ? `${pUsuario.nome} - ${pUsuario.email}`  : '';
  }

  obterEmail(pEmail: any): any {
    return pEmail ? `${pEmail.email}` : '';
  }

  public retiraCaracteresEspeciais(pTermo: any): string {
    return String(pTermo)
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

  }

  //Retorna o registro utilizado pela tela
  get registro(): any[] {
    return this._registros;
  }

  /// FIM - ÁREA DE REGRAS E PROCESSAMENTOS ///

}

