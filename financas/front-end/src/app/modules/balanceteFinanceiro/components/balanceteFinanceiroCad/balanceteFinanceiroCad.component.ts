import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";
import { BalanceteFinanceiroService } from "src/app/services/balanceteFinancerio.service";

@Component({
    selector: "balanceteFinanceiroCadComponent",
    templateUrl: './balanceteFinanceiroCad.component.html',
    styleUrls: ['./balanceteFinanceiroCad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BalanceteFinanceiroCadComponent implements OnInit{

    form: FormGroup;
    periodoInicialFiltro: any[] = [];
    periodoInicialFiltroTodos: any[] = [];

    periodoFinalFiltro: any[] = [];
    periodoFinalFiltroTodos: any[] = [];
    resultadoFiltro: any[] = [];

    result: any;
    tipo: any;
    periodo: any;
    private _registros: any | undefined; 

    ngOnInit(): void { }

    constructor(
            protected formBuilder: FormBuilder,
            protected route: ActivatedRoute,
            protected router: Router,
            protected utils: Utils,
            protected cdr: ChangeDetectorRef,
            protected service : BalanceteFinanceiroService
        ) {
            this.form = this.criarForm();

            this.route.paramMap.subscribe(params=>{
                this.periodo = params.get('periodo') || 'anual';
                this.tipo = params.get('tipo') || 'BCOT';
            });

            this.atualizarRegistro();

            this.utils.tratarAutoCompleteEntidade(this.form.controls['periodoInicial'],
                this.form.controls['idPeriodoInicial'], this.aplicarFiltroPeriodoInicial.bind(this), 0);
        
                this.utils.tratarAutoCompleteEntidade(this.form.controls['periodoFinal'],
                    this.form.controls['idPeriodoFinal'], this.aplicarFiltroPeriodoFinal.bind(this), 0);
        }

        private criarForm(): FormGroup{
            return this.formBuilder.group({
                id:[null, []],

                periodoInicial: [null, []],
                idPeriodoInicial: [null, []],
    
                periodoFinal: [null, []],
                idPeriodoFinal: [null, []],

                totalDespesa: [null, []],
                totalReceita: [null, []],
                resultadoGeral: [null, []]

            },
            {updateOn: "change"}
        );
        }

        atualizarRegistro() {
 
            const lIdStr: any = this.route.snapshot.paramMap.get("idRegistro");
     
            if (lIdStr) {   
                  this.service.ObterPorId(parseInt(lIdStr)).subscribe((result) => {
     
                     this._registros = result;
                     this.carregarCombosFiltros(this.periodo);
                     this.preencherFormCompleto(this._registros);
                  });
            } else {      
                this._registros = {};
                this.carregarCombosFiltros(this.periodo);
                this.preencherForm(this._registros);
            }
        }

        private preencherForm(pRegistro: any): void{
            this.form.patchValue(pRegistro);
        }

        public preencherFormCompleto(pRegistro: any): void{
            this.form.controls["id"].setValue(pRegistro.id);
            this.form.controls["periodoInicial"].setValue(pRegistro.periodoInicial);
            this.form.controls["periodoFinal"].setValue(pRegistro.periodoFinal);
            this.form.controls["totalDespesa"].setValue(pRegistro.totalDespesa);
            this.form.controls["totalReceita"].setValue(pRegistro.totalReceita);
            this.form.controls["resultadoGeral"].setValue(pRegistro.resultadoGeral);
        }

        carregarCombosFiltros(pPeriodo: any){
            this.service.ObterBalanceteContabilPorPeriodo(pPeriodo).subscribe(result=>{
                this.carregarPeriodoInicial(result);
                this.carregarPeriodoFinal(result);
            });
        }
    
        carregarPeriodoInicial(pPeriodos: any[]){
            const listaPeriodo = pPeriodos;
            if(this.periodo === 'mensal'){
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
            }
           
    
            this.periodoInicialFiltro = this.utils.removeDuplicados(this.periodoInicialFiltro, "periodoInicial");
            this.periodoInicialFiltroTodos = this.periodoInicialFiltro;
        }
    
        carregarPeriodoFinal(pPeriodos: any[]){
            const listaPeriodo = pPeriodos;
            if(this.periodo === 'mensal'){
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
            }
            
    
            this.periodoFinalFiltro = this.utils.removeDuplicados(this.periodoFinalFiltro, "periodoFinal");
            this.periodoFinalFiltroTodos = this.periodoFinalFiltro;
        }

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
            const lPeriodoInicial = this.form.controls['periodoInicial'].value;
            const lPeriodoFinal = this.form.controls['periodoFinal'].value;
    
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
        }
    
        obterPeriodoInicial(pPeriodoInicial: any): any{
            return pPeriodoInicial ? `${pPeriodoInicial.periodoInicial}` : '';
        }
    
        obterPeriodoFinal(pPeriodoFinal: any): any{
            return pPeriodoFinal ? `${pPeriodoFinal.periodoFinal}` : '';
        }

        calcularBalancete(){
            const pInicial = this.form.controls["periodoInicial"].value;
            const pFinal = this.form.controls["periodoFinal"].value;

            this.service.ResultadoBalanceteContabil(pInicial.periodoInicial ?? pInicial,
                pFinal.periodoFinal ?? pFinal,
                this.periodo).subscribe((result)=>{
                    this.form.controls["totalDespesa"].setValue(result.totalDespesas);
                    this.form.controls["totalReceita"].setValue(result.totalReceitas);
                    this.form.controls["resultadoGeral"].setValue(result.resultadoGeral);
            });
        }

        public retiraCaracteresEspeciais(pTermo: any): string {
            return String(pTermo)
              .trim()
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase();
        
          }

        formatarSomenteLetras(nomeCampo: string, event:any): void{
            const valorTexto = this.utils.formatarSomenteLetras(event);
    
            this.form.get(nomeCampo)?.setValue(valorTexto);
        }
    
        get registro(): any[]{
            return this._registros;
        }

        prepararDadosPersistir(){
            const pInicial = this.form.controls["periodoInicial"].value;
            const pFinal = this.form.controls["periodoFinal"].value;

            const objBalancete = {
                Id: this.form.controls['id'].value ?? 0,  
                PeriodoInicial: pInicial.periodoInicial ?? pInicial,              
                PeriodoFinal: pFinal.periodoFinal ?? pFinal,              
                TotalDespesa: this.form.controls['totalDespesa'].value,            
                TotalReceita: this.form.controls['totalReceita'].value,
                ResultadoGeral: this.form.controls['resultadoGeral'].value,              
                Deletado: false,  
            };

            return objBalancete;

        }

        confirmar() {
            if (this.utils.validarForm(this.form)) {
                const objectPersistir = this.prepararDadosPersistir();
                  this.service.PersistirBalancete(objectPersistir).subscribe((result) => {
                      this.result = result;
                      this._registros = result;
                      this.utils.exibirSucesso("Registro salvo com sucesso.");
                      this.form.markAsPristine();
                      this.cdr.detectChanges();
                      this.router.navigate(["balanceteFinanceiro", this.periodo, this.tipo, "lista"]);
                  });

                } else {
                    //Exibe a mensagem indicando que há campos inválidos no form
                    this.utils.exibirWarning('Há pendências no preenchimento no formulário.');
                }
        }
        cancelar(): void{
            this.router.navigate(["balanceteFinanceiro", this.periodo, this.tipo, "lista"]);
        }

}