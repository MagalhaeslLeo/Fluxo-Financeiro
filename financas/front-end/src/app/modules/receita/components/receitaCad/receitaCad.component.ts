import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";
import { ReceitaService } from "src/app/services/receita.service";
import { FonteRendaService } from "src/app/services/fonteRenda.service";

@Component({
    selector: "receitaCadComponent",
    templateUrl: './receitaCad.component.html',
    styleUrls: ['./receitaCad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ReceitaCadComponent implements OnInit {
    ///Área de atributos objetos e variáveis
    form: FormGroup;
    listaFonteRendaFiltro: any[] = [];
    result: any;
    private _registros: any | undefined; 
    public msgValidacao: {[key: string]: any}



    ngOnInit(): void { }

    constructor(
        protected formBuilder: FormBuilder,
        protected router: ActivatedRoute,
        protected route: Router,
        protected utils: Utils,
        protected cdr: ChangeDetectorRef,
        protected service: ReceitaService,
        protected serviceFonteRenda: FonteRendaService
    ) {
        this.form = this.criarForm();
        this.msgValidacao = this.criarMensagensValidacao();
        this.atualizarRegistro();
    }

    private criarForm(): FormGroup {
        return this.formBuilder.group(
            {
                id: [null, []],
                descricaoReceita: [null, Validators.required],
                fonteRenda: [null, Validators.required],
                valorReceita: [null, Validators.required],
                dataCriacao: [null, Validators.required]
            },
            { updateOn: "change" }
        );
    }

    private criarMensagensValidacao(): {[key:string]: any}{
        return {
            'descricaoReceita': [
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'valorReceita': [
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'dataCriacao':[
                {
                    type: 'required',
                    msg: 'Data inválida'
                }
            ],
            'fonteRenda':[
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ]
        }
    }

    atualizarRegistro() {
 
        //Obtem o ID do registro via parametro da rota
        const lIdStr: any = this.router.snapshot.paramMap.get("idRegistro");
 
        //Se recebeu o ID é para preencher o form com o registro relacionado
        if (lIdStr) {
 
            // Chama o service para obter o registro a partir do seu ID
             this.service.ObterPorId(parseInt(lIdStr)).subscribe((result) => {
 
                 //Atualiza o atributo que contem os registros
                this._registros = result;
                this.carregarComboFonteRenda();       
               //Preenche o form com os dados do regsitro
                this.preencherFormCompleto(this._registros);

 
 
             });
        } else {
 
            //Nao recebeu ID, então considera uma inserção e Cria o registro vazio ou com dados default.
            this._registros = {};
            this.carregarComboFonteRenda();
            //Preenche o form com os dados do registro
            this.preencherForm(this._registros);
 
        }
    }

    private preencherForm(pRegistro: any): void{
        this.form.patchValue(pRegistro);
    }

    public preencherFormCompleto(pRegistro: any): void{
        this.form.controls["id"].setValue(pRegistro.id);
        this.form.controls["descricaoReceita"].setValue(pRegistro.descricaoReceita);
        this.form.controls["fonteRenda"].setValue(pRegistro.fonteRenda);
        this.form.controls["valorReceita"].setValue(pRegistro.valorReceita);
        this.form.controls["dataCriacao"].setValue(pRegistro.dataCriacao);
    }

    formatarSomenteLetras(nomeCampo: string, event:any): void{
        const valorTexto = this.utils.formatarSomenteLetras(event);

        this.form.get(nomeCampo)?.setValue(valorTexto);
    }

    get registro(): any[]{
        return this._registros;
    }


    confirmar() {
 
       
        const objReceita = {
 
            Id: this.form.controls['id'].value ?? 0,  
            DescricaoReceita: this.form.controls['descricaoReceita'].value,              
            FonteRenda: this.form.controls['fonteRenda'].value,
            ValorReceita: this.form.controls['valorReceita'].value,            
            DataCriacao: this.form.controls['dataCriacao'].value,
            Deletado: false
 
        }
 
        //Verifica se há campos inválidos
        if (this.utils.validarForm(this.form)) {
 
            //Chama o service para a persistencia, passando os dados do FORM como parametro
             this.service.PersistirReceita(objReceita).subscribe((result) => {
                 this.result = result;
                 this._registros = result;
                 this.utils.exibirSucesso("Registro salvo com sucesso.");
                 this.form.markAsPristine();
                 this.cdr.detectChanges();
                 //this.route.navigate(["usuario", "cad", result.id]);
                 this.route.navigate(["receita", "lista"]);
 
            });
 
        } else {
            //Exibe a mensagem indicando que há campos inválidos no form
            this.utils.exibirWarning('Há pendências no preenchimento no formulário.');
        }
    }
    cancelar(): void{
        this.route.navigate(["receita", "lista"]);
    }

    carregarComboFonteRenda(){
        this.serviceFonteRenda.ObterTodasFonteRendas().subscribe(result =>{
            this.listaFonteRendaFiltro = result;
            this.cdr.detectChanges();
        });
    }
}