import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";

@Component({
    selector: "usuarioCadComponent",
    templateUrl: './usuarioCad.component.html',
    styleUrls: ['./usuarioCad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsuarioCadComponent implements OnInit {
    ///Área de atributos objetos e variáveis
    form: FormGroup;
    private _registros: any | undefined; 
    public msgValidacao: {[key: string]: any}



    ngOnInit(): void { }

    constructor(
        protected formBuilder: FormBuilder,
        protected router: ActivatedRoute,
        protected route: Router,
        protected utils: Utils
    ) {
        this.form = this.criarForm();
        this.msgValidacao = this.criarMensagensValidacao();
    }

    private criarForm(): FormGroup {
        return this.formBuilder.group(
            {
                usuario: [null, Validators.required],
                idUsuario: [null, Validators.required],
                email: [null, Validators.required],
                idEmail: [null, Validators.required],
                dataInclusao: [null, Validators.required],
                idDataIclusao: [null, Validators.required]
            },
            { updateOn: "change" }
        );
    }

    private criarMensagensValidacao(): {[key:string]: any}{
        return {
            'usuario': [
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'email': [
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'dataInclusao':[
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ]
        }
    }

    private preencherForm(pRegistro: any): void{
        this.form.patchValue(pRegistro);
    }

    public preencherFormCompleto(pRegistro: any): void{
        this.form.controls["usuario"].setValue(pRegistro.nome);
        this.form.controls["email"].setValue(pRegistro.email);
        this.form.controls["dataInclusao"].setValue(pRegistro.dataInclusao);
    }

    get registro(): any[]{
        return this._registros;
    }

    atualizarRegistro() {
 
        //Obtem o ID do registro via parametro da rota
        const lIdStr: any = this.router.snapshot.paramMap.get("idRegistro");
 
        //Se recebeu o ID é para preencher o form com o registro relacionado
        if (lIdStr) {
 
            // Chama o service para obter o registro a partir do seu ID
            // this.service.obterPorId(parseInt(lIdStr)).subscribe((result) => {
 
            //     //Atualiza o atributo que contem os registros
            //     this._registros = result;              
            //     //Preenche o form com os dados do regsitro
            //     this.preencherFormCompleto(this._registros);

 
 
            // });
        } else {
 
            //Nao recebeu ID, então considera uma inserção e Cria o registro vazio ou com dados default.
            this._registros = {};            
            //Preenche o form com os dados do registro
            this.preencherForm(this._registros);
 
        }
    }

    confirmar() {
 
       
        const objUsuario = {
 
            id: this.form.controls['id'].value,                   
            nome: this.form.controls['usuario'].value,
			email: this.form.controls['usuario'].value,            
            dataPublicacao: this.form.controls['dataInclusao'].value,
 
        }
 
        //Verifica se há campos inválidos
        if (this.utils.validarForm(this.form)) {
 
            //Chama o service para a persistencia, passando os dados do FORM como parametro
            // this.service.persistir(objUsuario).subscribe((result) => {
            //     this.result = result;
            //     this._registro = result;
            //     this.utils.exibirSucesso("Registro salvo com sucesso.");
            //     this.form.markAsPristine();
            //     this.cdr.detectChanges();
            //     this.route.navigate(["usuario", "cad", result.id]);
 
            //});
 
        } else {
            //Exibe a mensagem indicando que há campos inválidos no form
            this.utils.exibirWarning('Há pendências no preenchimento no formulário.');
        }
    }
    cancelar(): void{
        this.route.navigate(["usuario", "lista"]);
    }
}