import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";
import { ReceitaService } from "src/app/services/receita.service";
import { PerfilService } from "src/app/services/perfil.service";

@Component({
    selector: "fonteRendaCadComponent",
    templateUrl: './fonteRendaCad.component.html',
    styleUrls: ['./fonteRendaCad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FonteRendaCadComponent implements OnInit {
    ///Área de atributos objetos e variáveis
    form: FormGroup;
    listaContaFiltro: any[] = [];
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
        protected servicePerfil: PerfilService
    ) {
        this.form = this.criarForm();
        this.msgValidacao = this.criarMensagensValidacao();
        this.atualizarRegistro();
    }

    private criarForm(): FormGroup {
        return this.formBuilder.group(
            {
                id: [null, []],
                fonteRenda: [null, Validators.required],
                conta: [null, Validators.required]
            },
            { updateOn: "change" }
        );
    }

    private criarMensagensValidacao(): {[key:string]: any}{
        return {
            'fonteRenda':[
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'conta': [
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
        this.form.controls["fonteRenda"].setValue(pRegistro.fonteRenda);
        this.form.controls["conta"].setValue(pRegistro.conta);
    }

    formatarSomenteLetras(nomeCampo: string, event:any): void{
        const valorTexto = this.utils.formatarSomenteLetras(event);

        this.form.get(nomeCampo)?.setValue(valorTexto);
    }

    get registro(): any[]{
        return this._registros;
    }


    confirmar() {
 
       
        const objFonteRenda = {
 
            Id: this.form.controls['id'].value ?? 0,           
            FonteRenda: this.form.controls['fonteRenda'].value,
            Conta: this.form.controls['conta'].value ,
            Deletado: false,
 
        }
 
        //Verifica se há campos inválidos
        if (this.utils.validarForm(this.form)) {
 
            //Chama o service para a persistencia, passando os dados do FORM como parametro
             this.service.PersistirReceita(objFonteRenda).subscribe((result) => {
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
        this.servicePerfil.ObterTodosPerfis().subscribe(result =>{
            this.listaContaFiltro = result;
            this.cdr.detectChanges();
        });
    }
}