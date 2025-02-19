import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";

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
    private _registros: any | undefined; 

    ngOnInit(): void { }

    constructor(
            protected formBuilder: FormBuilder,
            protected router: ActivatedRoute,
            protected route: Router,
            protected utils: Utils,
            protected cdr: ChangeDetectorRef
        ) {
            this.form = this.criarForm();
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
                TotalReceita: [null, []],
                resultadoGeral: [null, []]

            },
            {updateOn: "change"}
        );
        }

        atualizarRegistro() {
 
            const lIdStr: any = this.router.snapshot.paramMap.get("idRegistro");
     
            if (lIdStr) {   
                //  this.service.ObterPorId(parseInt(lIdStr)).subscribe((result) => {
     
                //     this._registros = result;
                //     this.preencherFormCompleto(this._registros);
                //  });
            } else {      
                this._registros = {};
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

        confirmar() {
 
       
            const objBalancete = {
     
                Id: this.form.controls['id'].value ?? 0,  
                PeriodoInicial: this.form.controls['periodoInicial'].value,              
                PeriodoFinal: this.form.controls['periodoFinal'].value,              
                TotalDespesa: this.form.controls['totalDespesa'].value,            
                TotalReceita: this.form.controls['totalReceita'].value,
                ResultadoGeral: this.form.controls['resultadoGeral'].value,              
                Deletado: false,
     
            }
            if (this.utils.validarForm(this.form)) {
 
                //Chama o service para a persistencia, passando os dados do FORM como parametro
                //  this.service.PersistirBalancete(objBalancete).subscribe((result) => {
                //      this.result = result;
                //      this._registros = result;
                //      this.utils.exibirSucesso("Registro salvo com sucesso.");
                //      this.form.markAsPristine();
                //      this.cdr.detectChanges();
                //      this.route.navigate(["balanceteFinanceiro", "lista"]);
                //  });

                } else {
                    //Exibe a mensagem indicando que há campos inválidos no form
                    this.utils.exibirWarning('Há pendências no preenchimento no formulário.');
                }
        }
        cancelar(): void{
            this.route.navigate(["balanceteFinanceiro", "lista"]);
        }

}