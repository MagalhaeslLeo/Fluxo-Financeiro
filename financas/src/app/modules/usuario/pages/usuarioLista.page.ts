import {Component} from '@angular/core';
import {MatTableDataSource, } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTabControl } from 'src/app/core/matTabControl';
//import { Router } from '@angular/router';

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

/**
 * @title Table with filtering
 */
@Component({
  styleUrls: ['./usuarioLista.page.scss'],
  templateUrl: './usuarioLista.page.html'
})
export class UsuarioListaPage {
  // displayedColumns: string[] = ['nome', 'email'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  // applyFilter(event: Event) {
  //   //const filterValue = (event.target as HTMLInputElement).value;
  //   //this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  //Preparação dos atributos Inicias Objetos e variáveis

  idElemento: any = 0;
  formFiltro: FormGroup;
  ppaFiltro: any[] = [];
  ppaFiltroTodos: any[] = [];
  numeroFiltroLOA: any[] = [];
  numeroFiltroTodosLOA: any[] = [];
  numeroFiltroInstrumento: any[] = [];
  numeroFiltroInstrumentoTodos: any[] = [];

  resultadoFiltro: any[] = [];
  result: any;

  //Atributo que contem o registro a ser exibido pelo formulario.
  private _registros: any | undefined;

  //Configuração das colunas a serem exibidas na tabela de acordo com os dados retornados
  private colunasConfig = [
    {
      atributo: 'nome',
      titulo: 'Nome do Usuario',
      innerHTML: (reg: any) => `${(reg.nome)}`
    },
    {
      atributo: 'email',
      titulo: 'Email do Usuário',
      innerHTML: (reg: any) => `${reg.email}`

    },
    // {
    //   atributo: 'numeroInstrumento',
    //   titulo: 'N° do Instrumento de Alteração Orçamentária',
    //   innerHTML: (reg: any) => `${reg.instrumento}`
    // },

  ];

  //Componente que controla o comportamento da matTable
  tabControl: MatTabControl = new MatTabControl(this.colunasConfig);

  /// FIM ///

  //CONSTRUTOR: Recursos usados para a Manipulação e Obtenção de Dados
  constructor(
    //protected utils: Utils,
    //protected router: Router,
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

    // Tratamento Auto-Complete
    // this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['numeroPPA'],
    //   this.formFiltro.controls['idnumeroPPA'], this.aplicarFiltroNumeroPPA.bind(this), 0);

    // this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['numeroLOA'],
    //   this.formFiltro.controls['idnumeroLOA'], this.aplicarFiltroNumeroLOA.bind(this), 0);

    // this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['numeroInstrumento'],
    //   this.formFiltro.controls['idNumeroInstrumento'], this.aplicarFiltroNumeroInstrumento.bind(this), 0);
  }

  /// FIM ///

  // ÁREA fORMULÁRIO

  //Cria e retorna o Formgroup que será utilizado pela tela

  private criarForm(): FormGroup {
    return this.formBuilder.group(
      {
        numeroPPA: [null, []],
        idnumeroPPA: [null, []],
        numeroLOA: [null, []],
        idnumeroLOA: [null, []],
        numeroInstrumento: [null, []],
        idNumeroInstrumento: [null, []],

      },
      { updateOn: "change" }
    );
  }

  //Retorna o registro utilizado pela tela
  get registros(): any[] {
    return this._registros;
  }
  /// FIM ///

  // ÁREA DE FUNCIONALIDADES: BOTÕES, COMBOS, IMPUTS ETC... 

  atualizarRegistros() {

    this.tabControl.registros = ELEMENT_DATA;
    this.ppaFiltro = ELEMENT_DATA;

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
    //this.router.navigate(['atoAlteracaoOrcamentaria', 'det']);
  }

  // Acao a ser executada quando o usuario solicita alteracao do registro selecionado
  alterar(pRegistro: any) {
    // Navega para a tela de cadastro no modo de alteracao(com id)
    //this.router.navigate(['atoAlteracaoOrcamentaria', 'det', pRegistro.id]);
  }

  // Acao a ser executada quando o usuario solicita exclusão do registro selecionado
  excluir(pRegistros: any[]) {
    // this.service.excluir(pRegistros.map(obj => obj.id)).subscribe(result => {
    //   this.result = result
    //   this.utils.exibirSucesso(pRegistros.length > 1 ? 'Registros excluídos com sucesso.' : 'Registros excluídos com sucesso.');
    //   this.atualizarRegistros();
    // });
  }

  /// FIM /// 

  //ÁREA DE REGRAS E PROCESSAMENTOS

  showMsg() {
    // this.utils.exibirWarning(
    //   "Selecione um Ente Federado para prosseguir"
    // );
  }

  ngOnInit(): void { }


  aplicarFiltroNumeroPPA(pPPA: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do ppa digitado pelo usuário
    this.ppaFiltro = this.ppaFiltroTodos.filter(f => {

      const ppaString = `${f.anoInicial} - ${f.anoFinal} (${f.lei})`;
      return ppaString.includes(pPPA);

    });

  }

  aplicarFiltroNumeroLOA(pNumero: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário 
    this.numeroFiltroLOA = this.numeroFiltroTodosLOA.filter(f => {
      const numeroLoaString = `${f.anoPublicacao}(${(f.numero)})`
      return numeroLoaString.includes(pNumero.toString());

    });
  }

  aplicarFiltroNumeroInstrumento(pNumero: any): void {

    // Filtra as opções disponíveis, mantendo apenas aquelas que incluem o conteúdo do númeroLDO digitado pelo usuário
    this.numeroFiltroInstrumento = this.numeroFiltroInstrumentoTodos.filter(f => {

      const numeroString = `${f.instrumento}`
      return numeroString.includes(pNumero.toString());

    });
  }

  aplicarFiltro(): void {
    this.resultadoFiltro = this.registro;
    const lNumeroPPA = this.formFiltro.controls['numeroPPA'].value;
    const lNumeroLOA = this.formFiltro.controls['numeroLOA'].value;
    const lNumeroInstrumento = this.formFiltro.controls['numeroInstrumento'].value;

    if (lNumeroPPA != undefined && lNumeroPPA != '' && lNumeroPPA != null) {

      const ppaString = `${lNumeroPPA.anoInicial} - ${lNumeroPPA.anoFinal} (${lNumeroPPA.lei})`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroPPAString = `${f.loa.ldo.ppa.anoInicial} - ${f.loa.ldo.ppa.anoFinal} (${f.loa.ldo.ppa.lei})`;
        return registroPPAString.includes(ppaString);
      });

    }

    if (lNumeroLOA != undefined && lNumeroLOA != '' && lNumeroLOA != null) {
      const loaString = `${lNumeroLOA.anoPublicacao} (${lNumeroLOA.numero})`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroNumeroLOAString = `${new Date(f.dataPublicacao).getFullYear()} (${f.loa.numero})`
        return registroNumeroLOAString.includes(loaString);
      });

    }

    if (lNumeroInstrumento != undefined && lNumeroInstrumento != '' && lNumeroInstrumento != null) {
      const ldoString = `${lNumeroInstrumento.instrumento}`;

      this.resultadoFiltro = this.resultadoFiltro.filter(f => {
        const registroNumeroInstrumentoString = `${f.instrumento}`
        return registroNumeroInstrumentoString.includes(ldoString);
      });

    }

    this.tabControl.registros = this.resultadoFiltro;

  }

  obterNumeroPPA(pEntidade: any): any {
    return pEntidade ? `${pEntidade.anoInicial} - ${pEntidade.anoFinal} (${pEntidade.lei})` : '';
  }

  obterNumeroLOA(pEntidade: any): any {
    return pEntidade ? `(${pEntidade.anoPublicacao}) ${pEntidade.numero}` : undefined;
  }

  obterNumeroInstrumento(pEntidade: any): any {
    return pEntidade ? `${pEntidade.instrumento}` : undefined;
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

  /// FIM ///

}

