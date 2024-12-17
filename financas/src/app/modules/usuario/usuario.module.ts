import { NgModule } from "@angular/core";
import { UsuarioListaPage } from "./pages/usuarioLista.page";
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { UsuarioRoutingModule } from "./usuario.routing.module";
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
declarations: [
    UsuarioListaPage
],
imports:[
    CommonModule,
    MatTableModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
    UsuarioRoutingModule
],
providers: [

]
})


export class UsuarioModule {}