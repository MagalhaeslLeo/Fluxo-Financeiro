import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
    selector: "usuarioCadComponent",
    templateUrl: './usuarioCad.component.html',
    styleUrls: ['./usuarioCad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class UsuarioCadComponent implements OnInit {
    ///Área de atributos objetos e variáveis
    form: FormGroup;
    result: any;
    private _registros: any | undefined; 
    public msgValidacao: {[key: string]: any}



    ngOnInit(): void { }

    constructor(
        protected formBuilder: FormBuilder,
        protected router: ActivatedRoute,
        protected route: Router,
        protected utils: Utils,
        protected service: UsuarioService
    ) {
        this.form = this.criarForm();
        this.msgValidacao = this.criarMensagensValidacao();
        this.atualizarRegistro();
    }

    private criarForm(): FormGroup {
        return this.formBuilder.group(
            {
                id: [null, []],
                nomeUsuario: [null, Validators.required],
                emailUsuario: [null, Validators.required],
                dataCriacao: [null, Validators.required],
            },
            { updateOn: "change" }
        );
    }

    private criarMensagensValidacao(): {[key:string]: any}{
        return {
            'nomeUsuario': [
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'emailUsuario': [
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'dataCriacao':[
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
        this.form.controls["id"].setValue(pRegistro.id);
        this.form.controls["nomeUsuario"].setValue(pRegistro.nome);
        this.form.controls["emailUsuario"].setValue(pRegistro.email);
        this.form.controls["dataCriacao"].setValue(pRegistro.dataCriacao);
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
             this.service.ObterUsuarioPorId(parseInt(lIdStr)).subscribe((result) => {
 
                 //Atualiza o atributo que contem os registros
                this._registros = result;              
               //Preenche o form com os dados do regsitro
                this.preencherFormCompleto(this._registros);

 
 
             });
        } else {
 
            //Nao recebeu ID, então considera uma inserção e Cria o registro vazio ou com dados default.
            this._registros = {};            
            //Preenche o form com os dados do registro
            this.preencherForm(this._registros);
 
        }
    }

    confirmar() {
 
       
        const objUsuario = {
 
            Id: this.form.controls['id'].value ?? 0,  
            IdPerfil: 1,
            Senha: "123456",              
            Nome: this.form.controls['nomeUsuario'].value,
            Email: this.form.controls['emailUsuario'].value,            
            DataCriacao: this.form.controls['dataCriacao'].value,
            Deletado: false,
 
        }
 
        //Verifica se há campos inválidos
        if (this.utils.validarForm(this.form)) {
 
            //Chama o service para a persistencia, passando os dados do FORM como parametro
             this.service.PersistirUsuario(objUsuario).subscribe((result) => {
                 this.result = result;
                 this._registros = result;
                 this.utils.exibirSucesso("Registro salvo com sucesso.");
                 this.form.markAsPristine();
                 //this.cdr.detectChanges();
                 this.route.navigate(["usuario", "cad", result.id]);
 
            });
 
        } else {
            //Exibe a mensagem indicando que há campos inválidos no form
            this.utils.exibirWarning('Há pendências no preenchimento no formulário.');
        }
    }
    cancelar(): void{
        this.route.navigate(["usuario", "lista"]);
    }
}