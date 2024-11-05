import { NgModule } from "@angular/core";
import { UsuarioListaPage } from "./pages/usuarioLista";
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import { UsuarioRoutingModule } from "./usuario.routing.module";
import {MatInputModule} from '@angular/material/input';

@NgModule({
declarations: [
    UsuarioListaPage
],
imports:[
    MatTableModule,
    MatFormFieldModule,
    UsuarioRoutingModule,
    MatInputModule
],
providers: [

]
})


export class UsuarioModule {}