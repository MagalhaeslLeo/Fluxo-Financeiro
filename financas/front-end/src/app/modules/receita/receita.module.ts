import { NgModule } from "@angular/core";
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import { ReceitaListaPage } from "./pages/receitaLista/receitaLista.page";
import { ReceitaRoutingModule } from "./receita.routing.module";
import { ReceitaDetPage } from "./pages/receitaDet/receitaDet.page";
import { ReceitaCadComponent } from "./components/receitaCad/receitaCad.component";
import { FonteRendaCadDialog } from "./components/dialogs/fonteRendaCad.dialog";
import { FonteRendaListaPage } from "./components/fonteRendaLista/fonteRendaLista.page";
import { ReceitaListaDetPage } from "./pages/receitaListaDet/receitaListaDet.page";



@NgModule({
declarations: [
    ReceitaListaPage,
    ReceitaDetPage,
    ReceitaListaDetPage,
    ReceitaCadComponent,
    FonteRendaCadDialog,
    FonteRendaListaPage
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
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTabsModule,
    ReceitaRoutingModule,
    
],
providers: [

]
})


export class ReceitaModule {}