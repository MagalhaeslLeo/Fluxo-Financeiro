import { Component, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
 
@Component({
  templateUrl: './opcao.dialog.html',
  styleUrls: ['./opcao.dialog.scss']
})
@Injectable({
  providedIn: 'root'
})
export class OpcaoDialog {
  selectedOption: string;  // Valor selecionado do radio
  options: string[];       // Opções dinâmicas recebidas
 
  constructor(
    public dialogRef: MatDialogRef<OpcaoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // 'data' contém as opções passadas, como o texto, títulos, e as opções de radio
    this.options = data.options || [];
    this.selectedOption = this.options.length ? this.options[0] : ''; // Padrão para a primeira opção
  }
 
  cancelar(): void {
    this.dialogRef.close();  // Fecha o dialog sem retornar valor
  }
 
  confirmar(): void {
    this.dialogRef.close(this.selectedOption);  // Retorna o valor selecionado
  }
 
}