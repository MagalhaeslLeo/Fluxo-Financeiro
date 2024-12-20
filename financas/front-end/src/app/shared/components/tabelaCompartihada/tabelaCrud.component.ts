import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabControl } from 'src/app/core/matTabControl';



@Component({
  selector: 'tabelaCrud',
  templateUrl: './tabelaCrud.component.html',
  styleUrls: ['./tabelaCrud.component.scss']
})
export class TabelaCrudComponent implements OnInit {

  @Input() tabControl: MatTabControl | undefined;
  @Input() confirmacaoExclusao: boolean = true;
  @Input() height:string='70vh'
  @Input() exibeMenuOpcoes:boolean=false;
  @Output() inserir = new EventEmitter();
  @Output() alterar = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();
  @Output() atualizar = new EventEmitter();


  constructor(
    protected router: Router) {

  }

  ngOnInit() {

  }

  get registros(): any[] {
    return this.tabControl?.dataSource.data;
  }

  inserirEvent() {
    this.inserir.emit();
  }

  atualizarEvent() {
    this.atualizar.emit();
  }

  alterarEvent(pRows: any) {
    if (pRows && pRows.length>0) {
      if (pRows.length > 1) {
       // this.utils.exibirWarning('Selecione apenas um registro para a alteração.');
      }else{
        this.alterar.emit(pRows[0]);
      }

      
    } else {
     // this.utils.exibirWarning('Nenhum registro foi selecionado.');
    }
  }


  excluirEvent(pRows: any[]) {
    if (pRows && pRows.length > 0) {
      if (this.confirmacaoExclusao) {
        let lMsg: string = 'Confirma a exclusão do registro selecionado?';
        if (pRows.length > 1) {
          lMsg = 'Confirma a exclusão dos ' + pRows.length + ' registros selecionados?';
        }
       // const lDialogConfirmacao = this.utils.abrirDialogConfirmacao(lMsg);
        //Com a referência após ser fechado se a exclusão for confirmada irá prosseguir para excluir o registro do banco de dados
        // lDialogConfirmacao.afterClosed().subscribe(result => {
        //   if (result) {
        //     this.excluir.emit(pRows);
        //   }
        // })

      } else {
        this.excluir.emit(pRows);
      }
    } else {
      //this.utils.exibirWarning('Nenhum registro foi selecionado.');
    }

  }

  onMouseUp(pEvent: any, pRow: any) {
    if (this.tabControl?.onMouseUp(pEvent, pRow)) {
      //Identificou o click, chama o evento para edicao
      this.alterar.emit(pRow);
    }
  }

}
