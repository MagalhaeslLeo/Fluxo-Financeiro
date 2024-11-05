import {Component} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  nome: string;
  email: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {nome: 'Hydrogen', email: 'H'},
  {nome: 'Helium', email: 'He'},
  {nome: 'Lithium', email: 'Li'},
  {nome: 'Beryllium', email: 'Be'},
  {nome: 'Boron', email: 'B'},
  {nome: 'Carbon', email: 'C'},
  {nome: 'Nitrogen', email: 'N'},
  {nome: 'Oxygen', email: 'O'},
  {nome: 'Fluorine', email: 'F'},
  {nome: 'Neon', email: 'Ne'},
];

/**
 * @title Table with filtering
 */
@Component({
  styleUrls: ['./usuarioLista.page.scss'],
  templateUrl: './usuarioLista.page.html'
})
export class UsuarioListaPage {
  displayedColumns: string[] = ['nome', 'email'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
