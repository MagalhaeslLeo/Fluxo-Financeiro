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
import { DespesaListaPage } from "./pages/despesaLista/despesaLista.page";
import { DespesaRoutingModule } from "./despesa.routing.module";
import { DespesaCadComponent } from "./components/despesaCad/despesaCad.component";
import { DespesaDetPage } from "./pages/despesaDet/despesaDet.page";



@NgModule({
declarations: [
    DespesaListaPage,
    DespesaCadComponent,
    DespesaDetPage
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
    DespesaRoutingModule
],
providers: [

]
})


export class DespesaModule {}