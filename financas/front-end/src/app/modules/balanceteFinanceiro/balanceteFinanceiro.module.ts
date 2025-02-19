import { NgModule } from "@angular/core";
import { BalanceteFinanceiroRoutingModule } from "./balanceteFinanceiro.routing.module";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { MatTabsModule } from "@angular/material/tabs";
import { BalanceteFinanceiroListaPage } from "./pages/balanceteFinanceiroLista/balanceteFinanceiroLista.page";

@NgModule({
declarations: [
    BalanceteFinanceiroListaPage
],
imports: [
    BalanceteFinanceiroRoutingModule,
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
        MatTabsModule
],
providers: []
})

export class BalanceteFinanceiroModule{}