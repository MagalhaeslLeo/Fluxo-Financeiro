import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatDialogModule } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { CabecalhoTabelaComponent } from './components/cabacalhoTabelacompartihada/cabecalhoTabela.component';
import { TabelaCrudComponent } from './components/tabelaCompartihada/tabelaCrud.component';
import { SafeHtmlPipe } from '../core/aafeHtmlPipe';
import { ValidacaoCampoComponent } from './components/validacaoCampo/validacaoCampo.component';
import { RodapeCadComponent } from './components/rodapeCad/rodapeCad.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatTableModule,
        MatRadioModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatSortModule,
        MatSelectModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatRadioModule,
        
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    declarations: [
        CabecalhoTabelaComponent,
        TabelaCrudComponent,
        ValidacaoCampoComponent,
        RodapeCadComponent,
        SafeHtmlPipe
        
        
    ],
    exports: [
        CabecalhoTabelaComponent,
        TabelaCrudComponent,
        ValidacaoCampoComponent,
        RodapeCadComponent
        
    ],
    providers: [

    ]
})
export class SharedModule { }
