import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabControl } from 'src/app/core/matTabControl';
import { Utils } from 'src/app/core/utils';
import { BalanceteFinanceiroService } from 'src/app/services/balanceteFinancerio.service';

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
    isLoading: boolean = true;
    periodo: any;
    tipo: any;

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
        protected route: ActivatedRoute,
        protected formBuilder: FormBuilder,
        protected service: BalanceteFinanceiroService
    ){
        this.formFiltro = this.criarForm();

        this.route.paramMap.subscribe(params=>{
            this.periodo = params.get('periodo') || 'anual';
            this.tipo = params.get('tipo') || 'BCOT';
            this.atualizarRegistros();
        });
        

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

          this.isLoading = true;

          this.service.ObterBalanceteContabilPorPeriodo(this.periodo).subscribe(result => {
              this._registros = result;

              this.carregarCombosFiltros(result, this.periodo);

              this.tabControl.registros = [];

              this.resultadoFiltro = result;

              this.isLoading = false;
          });
     }

    inserir(){
        this.router.navigate(['balanceteFinanceiro', 'det']);
    }

    alterar(pRegistro: any){
        this.router.navigate(['balanceteFinanceiro', 'det', pRegistro.id]);
    }
     excluir(pRegistros: any[]){
          this.service.ExcluirBalancete(pRegistros.map(obj => obj.id)).subscribe(result=>{
              this.result = result;
              this.utils.exibirSucesso(pRegistros.length > 1 ? 'Registros excluídos com sucesso.' : 'Registros excluídos com sucesso.');
              this.atualizarRegistros();
          });
     }


    carregarCombosFiltros(pFiltro: any[], pPeriodo: any){
        this.carregarPeriodoInicial(pFiltro, pPeriodo);
        this.carregarPeriodoFinal(pFiltro, pPeriodo);
    }

    carregarPeriodoInicial(pInicial: any[], pPeriodo: any){
        const listaPeriodo = pInicial;
        if(pPeriodo === 'mensal'){
            this.periodoInicialFiltro = listaPeriodo.map(item => ({
                ...item,
                periodoInicial: new Date(item.periodoInicial+ 'T00:00:00' ).toLocaleDateString("pt-BR", {month: '2-digit', year: 'numeric'})
            }));
        }
        else{
             this.periodoInicialFiltro = listaPeriodo.map(item => ({
                 ...item,
                 periodoInicial: new Date(item.periodoInicial + 'T00:00:00').toLocaleDateString("pt-BR", {year: 'numeric'})
             }));
            // this.periodoInicialFiltro = listaPeriodo;
        }
       

        this.periodoInicialFiltro = this.utils.removeDuplicados(this.periodoInicialFiltro, "periodoInicial");
        this.periodoInicialFiltroTodos = this.periodoInicialFiltro;
    }

    carregarPeriodoFinal(pFinal: any[], pPeriodo: any){
        const listaPeriodo = pFinal;
        if(pPeriodo === 'mensal'){
            this.periodoFinalFiltro = listaPeriodo.map(item => ({
                ...item,
                periodoFinal: new Date(item.periodoFinal + 'T00:00:00').toLocaleDateString("pt-BR", {month: '2-digit', year: 'numeric'})
            }));
        }
        else{
             this.periodoFinalFiltro = listaPeriodo.map(item => ({
                 ...item,
                 periodoFinal: new Date(item.periodoFinal+ 'T00:00:00' ).toLocaleDateString("pt-BR", {year: 'numeric'})
             }));
            // this.periodoFinalFiltro = listaPeriodo;
        }
        

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
        this.resultadoFiltro = [];
        const comboPeriodoInicial = this.formFiltro.controls['periodoInicial'].value;
        const comboPeriodoFinal = this.formFiltro.controls['periodoFinal'].value;

        if(comboPeriodoInicial){
            const periodoInicialString = comboPeriodoInicial.periodoInicial ?? comboPeriodoInicial;

            this.resultadoFiltro = this.registro.filter(f =>{
                const registroPeriodoInicialString = `${f.periodoInicial}`
                return registroPeriodoInicialString.includes(periodoInicialString);
            });
        }

        if(comboPeriodoFinal){
            const periodoFinalString = comboPeriodoFinal.periodoFinal ?? comboPeriodoFinal;

            this.resultadoFiltro = this.resultadoFiltro.filter(f =>{
                const registroPeriodoFinalString = `${f.periodoFinal}`
                return registroPeriodoFinalString.includes(periodoFinalString);
            });
        }
        if(comboPeriodoInicial && comboPeriodoFinal){
            this.tabControl.registros = this.resultadoFiltro;
        }
        else{
            this.tabControl.registros = [];
        }
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