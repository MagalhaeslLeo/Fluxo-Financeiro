import { SelectionModel } from "@angular/cdk/collections";
import { Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

const TEMPO_CLICK=250;

export class MatTabControl {
  
  
  colunasConfig: any[];
  dataSource: any = new MatTableDataSource();
  selection = new SelectionModel<any>(true, []);
  //Gurda o instante do ultimo mouse down ocorrido na tabela
  //Necessiario para identificar o evento click
  private _mouseDownTime: Date | null = null;

  constructor(pColunasConfig: any[], pRegistros?: any[],
    ) {
    this.colunasConfig = pColunasConfig;   
    this.iniciarDataSource(pRegistros);

  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  sortData(pSort: Sort) {
    //ver https://material.angular.io/components/sort/examples
    if (this.dataSource?.data) {
      if (!pSort.active || pSort.direction === '') {
        return;
      }

      this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
        const isAsc = pSort.direction === 'asc';
        return this.dataSource.ordenar(pSort.active, a, b, isAsc);
      });
    }
  }


  //Utilizado pelo componente tabela para ordenar a grid no click do cabecalho da coluna
  //Ver tabelacomponent.sortData
  ordenar(pNomeAtributo: string, pReg1: any, pReg2: any, isAsc: boolean) {

    let v1 = (pNomeAtributo.split('.').reduce((o, p) => o && o[p], pReg1));
    if (v1 != null && v1 != undefined && v1.constructor?.name == 'String') {
      v1 = v1.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

    }

    let v2 = (pNomeAtributo.split('.').reduce((o, p) => o && o[p], pReg2));
    if (v2 != null && v2.constructor?.name == 'String') {
      v2 = v2.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }

    if (v1 == v2) return 0;

    if (v1 == null) return -1;

    return (v1 < v2 ? -1 : 1) * (isAsc ? 1 : -1);
  }




  //retorna verdadeiro se a tabela está em modo de seleção. Nesse modo, ao clicar na linha provoca sua seleção.
  get modoSelecao(): boolean {
    return this.selection && this.selection.selected.length > 0;
  }

  //Controle o uso do mouse para controlar evento de click da tabela.
  //Feito para impedir que o click para marcar um texto fosse interpretado como click do registro.
  onMouseDown(pEvent: any) {
    if(pEvent.which==1){
      this._mouseDownTime = new Date();
    }

  }

  //Controle o uso do mouse para controlar evento de click da tabela.
  //Feito para impedir que o click para marcar um texto fosse interpretado como click do registro.
  onMouseUp(pEvent: any, pRow:any): boolean {

    if (pEvent.which==1 && this._mouseDownTime) {
      const lNow: Date = new Date();
      //Se down e up foram rapidos, aciona o event de click
      if (lNow.getTime() - this._mouseDownTime.getTime() < TEMPO_CLICK) {
        return this.onRowClicked(pEvent, pRow);
      }

    }
    return false;

  }

   //Deve ser chamado quando a checkbox de uma linha for clicada
   checkBoxClicked(row:any) {
    this.selection.toggle(row);
}

  //Chamado no evento click de uma linha da tabela
  //Retorna true se o evento de click na coluna deve ser levantado
  private onRowClicked(pEvent: any, pRow: any): boolean {
    if(pEvent.which==1){
      if (pEvent.shiftKey) {
        this.onRowShiftClicked(pEvent, pRow);
      } else {
        //Verifica se clicou para selecionar o registro
        if (this.modoSelecao || pEvent.ctrlKey) {
          this.checkBoxClicked(pRow)
        } else {
          return true;
        }
      }
    }
    return false;
  }


  //Trata o click com o shift pressionado, relacionado com selecao
  private onRowShiftClicked(pEvent: any, pRow: any) {
    if (this.modoSelecao) {
      //Identifica o ultimo registro a ser selecionado
      const lUltimoSelecionado = this.selection.selected[this.selection.selected.length - 1];

      const lIndexUltimo = this.dataSource.data.findIndex((lObj:any) => lObj == lUltimoSelecionado);


      const lIndexSel = this.dataSource.data.findIndex((lObj:any) => lObj == pRow);

      const lIndexIni = Math.min(lIndexSel, lIndexUltimo);
      const lIndexFim = Math.max(lIndexSel, lIndexUltimo);



      for (let i = lIndexIni; i <= lIndexFim; i++) {

        if (i != lIndexUltimo) {
          this.checkBoxClicked(this.dataSource.data[i]);
        }

      }
    } else {
      //Primeiro a ser marcado com shift
      this.checkBoxClicked(pRow)

      return
    }

  }

  //Retorna a a coluna 'select' adicionada dos nomes das demais colunas de colunasConfig
  //Necessario para a matTable identificar as colunas a serem montadas no render
  get displayedColumnsSelect():string[]{   
    return ['select'].concat(this.colunasConfig.map(obj=>obj.atributo));
  }

  set registros(pRegistros:any[]){
    this.selection.clear();
    this.dataSource.data=pRegistros;

  }

  filtrarColuna(pFiltro: string, pNomeColuna: string){
    this.dataSource.filter = this.removerAcentuacao(pFiltro).toLowerCase();
    this.dataSource.filterPredicate = (data: any, filter: string) =>{
      return this.removerAcentuacao((data[pNomeColuna])).toLowerCase().indexOf(filter) != -1

    }


  }

  //Retorna string do termo recebido sem acentuação
  public removerAcentuacao(pTermo:string):string{
    if(pTermo){
        return pTermo.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    }else{
        return pTermo;
    }
  }

  public iniciarDataSource(pRegistros: any[] | undefined) {
    this.dataSource=new MatTableDataSource();
    this.dataSource.ordenar = this.ordenar;
      if(pRegistros){
        this.dataSource = new MatTableDataSource<any>(pRegistros);
      }
  }


  public removerRegistros(pRegistros: any[] | undefined){
    if(pRegistros){
      const lIdsSelecionados:any[]|undefined= pRegistros.map(lSelectedLine => lSelectedLine.id);                    
      const lRegistros=this.dataSource.data;

      lIdsSelecionados?.forEach(lId=>{                            
        this.removerRegistroDataSource(lRegistros,lId);
      })  
    
      //Limpa a seleção
      this.selection.clear();        
      //Redefine a lista de registros para atualizar a tabela
      this.registros=lRegistros;
    }
  }

  //Remove o registro com ID informado da coleção de registros recebida.
    //Utilizado na operacao de exclusao, para remover o registro da colecao original
   private removerRegistroDataSource(pRegistros: any[], pId: number) {      
      pRegistros.splice(pRegistros.findIndex(lObj => lObj.id == pId), 1);
  }

  //Executa as operações padroes após o sucesso da exclusao de registros
  processarExclusao(pRegistros: any[]) {    
    //Exibe a mensagem de sucesso
    // pUtils.exibirSucesso(
    //   pRegistros.length > 1
    //     ? "Registros excluídos com sucesso."
    //     : "Registros excluídos com sucesso."
    // );
    //Remove os registros excluidos da lista
    this.removerRegistros(pRegistros);
        
  }

  
}

 
