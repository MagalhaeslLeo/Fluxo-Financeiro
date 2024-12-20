import { Component, Inject, Injectable } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  templateUrl: './erroConfirmacao.dialog.html',
  styleUrls: ['./erroConfirmacao.dialog.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ErroConfirmacaoDialog {
  constructor(
    public dialogRef: MatDialogRef<ErroConfirmacaoDialog>,
    @Inject(MAT_DIALOG_DATA) public data:any) {}
  
  ok(): void {
    this.dialogRef.close();
  }
  
   

}