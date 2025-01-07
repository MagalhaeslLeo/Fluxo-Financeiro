import { NgModule } from "@angular/core";
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PerfilService } from "src/app/services/perfil.service";
import { UsuarioService } from "src/app/services/usuario.service";
import { HomeRoutingModule } from "./home.routing.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatNativeDateModule } from "@angular/material/core";
import { RouterModule } from "@angular/router";
import { MenuPage } from "./pages/menu/menu.page";
 
 
@NgModule({
declarations: [
    MenuPage
],
imports:[
    HomeRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    RouterModule
   
],
providers: [
    PerfilService,
    UsuarioService,
    ]
})
export class HomeModule { }