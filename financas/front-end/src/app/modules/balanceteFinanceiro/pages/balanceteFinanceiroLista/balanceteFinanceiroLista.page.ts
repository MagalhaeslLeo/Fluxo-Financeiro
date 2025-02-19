import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTabControl } from 'src/app/core/matTabControl';
import { Utils } from 'src/app/core/utils';

@Component({
    styleUrls: ['./balanceteFinanceiroLista.page.scss'],
    templateUrl: './balanceteFinanceiroLista.page.html'
})
export class BalanceteFinanceiroListaPage{
    idElemento: any = 0;
    formFiltro: FormGroup;

    periodoInicialFiltro: any[] = [];
    periodoInicialFiltroTodos: any[] = [];

    periodoFinalFiltro: any[] = [];
    periodoFinalFiltroTodos: any[] = [];

    resultadoFiltro: any[] = [];
    result: any;
    // isLoading: boolean = true;

    private _registros: any | undefined;

    private colunasConfig = [
        {
            atributo: 'totalReceita',
            titulo: 'Total de Receitas',
            innerHTML: (registro: any) => `${(registro.totalReceita)}`
        },
        {
            atributo: 'totalDespesa',
            titulo: 'Total de Despesas',
            innerHTML: (registro: any) => `${(registro.totalDespesa)}`
        },
        {
            atributo: 'resultadoGeral',
            titulo: 'Resultado Geral',
            innerHTML: (registro: any) => `${(registro.resultadoGeral)}`
        }
    ];

    tabControl: MatTabControl = new MatTabControl(this.colunasConfig);

    constructor(
        protected utils: Utils,
        protected router: Router,
        protected formBuilder: FormBuilder
    ){
        this.formFiltro = this.criarForm();
        // this.atualizarRegistros();

        this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['periodoInicial'],
        this.formFiltro.controls['idPeriodoInicial'], this.aplicarFiltroPeriodoInicial.bind(this), 0);

        this.utils.tratarAutoCompleteEntidade(this.formFiltro.controls['periodoFinal'],
            this.formFiltro.controls['idPeriodoFinal'], this.aplicarFiltroPeriodoFinal.bind(this), 0);
    }

    private criarForm(): FormGroup{
        return this.formBuilder.group({
            periodoInicial: [null, []],
            idPeriodoInicial: [null, []],

            periodoFinal: [null, []],
            idPeriodoFinal: [null, []],
        },
        {updateOn: "change"}
    );
    }

    get registro(): any[] {
        return this._registros;
    }

     atualizarRegistros(){

        //  this.isLoading = true;

        //  this.service.ObterTodosBalancetes().subscribe(result => {
        //      this._registros = result;
        //      this.carregarCombosFiltros(result);

        //      this.tabControl.registros = result;

        //      this.resultadoFiltro = result;

        //      this.isLoading = false;
        //  });
     }

    inserir(){
        this.router.navigate(['balanceteFinanceiro', 'det']);
    }

    alterar(pRegistro: any){
        this.router.navigate(['balanceteFinanceiro', 'det', pRegistro.id]);
    }
     excluir(pRegistros: any[]){
        //  this.service.ExcluirBalancete(pRegistros.map(obj => obj.id)).subscribe(result=>{
        //      this.result = result;
        //      this.utils.exibirSucesso(pRegistros.length > 1 ? 'Registros excluídos com sucesso.' : 'Registros excluídos com sucesso.');
        //      this.atualizarRegistros();
        //  });
     }


    carregarCombosFiltros(pFiltro: any[]){
        this.carregarPeriodoInicial(pFiltro);
        this.carregarPeriodoFinal(pFiltro);
    }

    carregarPeriodoInicial(pInicial: any[]){
        const listaPeriodo = pInicial;

        this.periodoInicialFiltro = listaPeriodo.map(item => ({
            ...item,
            periodoInicial: new Date(item.periodoInicial).toLocaleDateString("pt-BR", {month: '2-digit', year: 'numeric'})
        }));

        this.periodoInicialFiltro = this.utils.removeDuplicados(this.periodoInicialFiltro, "periodoInicial");
        this.periodoInicialFiltroTodos = this.periodoInicialFiltro;
    }

    carregarPeriodoFinal(pFinal: any[]){
        const listaPeriodo = pFinal;

        this.periodoFinalFiltro = listaPeriodo.map(item => ({
            ...item,
            periodoFinal: new Date(item.periodoFinal).toLocaleDateString("pt-BR", {month: '2-digit', year: 'numeric'})
        }));

        this.periodoFinalFiltro = this.utils.removeDuplicados(this.periodoFinalFiltro, "periodoFinal");
        this.periodoFinalFiltroTodos = this.periodoFinalFiltro;
    }


    showMsg() {
        this.utils.exibirWarning(
            "Selecione um balancete para prosseguir"
        );
    }

    ngOnInit(): void { }

    aplicarFiltroPeriodoInicial(pPeriodoInicial: any): void{
        this.periodoInicialFiltro = this.periodoInicialFiltroTodos.filter(f => {

            const periodoInicialString = `${f.periodoInicial}`
            return periodoInicialString.includes(pPeriodoInicial);
        });
    }

    aplicarFiltroPeriodoFinal(pPeriodoFinal: any): void{
        this.periodoFinalFiltro = this.periodoFinalFiltroTodos.filter(f => {

            const periodoFinalString = `${f.periodoFinal}`
            return periodoFinalString.includes(pPeriodoFinal);
        });
    }

    aplicarFiltro() : void{
        this.resultadoFiltro = this.registro;
        const lPeriodoInicial = this.formFiltro.controls['periodoInicial'].value;
        const lPeriodoFinal = this.formFiltro.controls['periodoFinal'].value;

        if(lPeriodoInicial && lPeriodoInicial.periodoInicial){
            const periodoInicialString = `${lPeriodoInicial.periodoInicial}`;

            this.resultadoFiltro = this.resultadoFiltro.filter(f =>{
                const registroPeriodoInicialString = `${f.periodoInicial}`
                return registroPeriodoInicialString.includes(periodoInicialString);
            });
        }

        if(lPeriodoFinal && lPeriodoFinal.periodoFinal){
            const periodoFinalString = `${lPeriodoFinal.periodoFinal}`;

            this.resultadoFiltro = this.resultadoFiltro.filter(f =>{
                const registroPeriodoFinalString = `${f.periodoFinal}`
                return registroPeriodoFinalString.includes(periodoFinalString);
            });
        }

        this.tabControl.registros = this.resultadoFiltro;
    }

    obterPeriodoInicial(pPeriodoInicial: any): any{
        return pPeriodoInicial ? `${pPeriodoInicial.periodoInicial}` : '';
    }

    obterPeriodoFinal(pPeriodoFinal: any): any{
        return pPeriodoFinal ? `${pPeriodoFinal.periodoFinal}` : '';
    }

    public retiraCaracteresEspeciais(pTermo: any): string {
        return String(pTermo)
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
    
      }
}