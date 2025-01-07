import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";
import { PerfilService } from "src/app/services/perfil.service";
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
    listaPerfilUsuarioFiltro: any[] = [];
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
        protected service: UsuarioService,
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
                nomeUsuario: [null, Validators.required],
                emailUsuario: [null, Validators.required],
                senhaUsuario: [null, Validators.required],
                perfilUsuario: [null, Validators.required],
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
                    msg: 'Data inválida'
                }
            ],
            'senhaUsuario':[
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'perfilUsuario':[
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
             this.service.ObterUsuarioPorID(parseInt(lIdStr)).subscribe((result) => {
 
                 //Atualiza o atributo que contem os registros
                this._registros = result;
                this.carregarComboPerfilUsuario();       
               //Preenche o form com os dados do regsitro
                this.preencherFormCompleto(this._registros);

 
 
             });
        } else {
 
            //Nao recebeu ID, então considera uma inserção e Cria o registro vazio ou com dados default.
            this._registros = {};
            this.carregarComboPerfilUsuario();
            //Preenche o form com os dados do registro
            this.preencherForm(this._registros);
 
        }
    }

    private preencherForm(pRegistro: any): void{
        this.form.patchValue(pRegistro);
    }

    public preencherFormCompleto(pRegistro: any): void{
        this.form.controls["id"].setValue(pRegistro.id);
        this.form.controls["nomeUsuario"].setValue(pRegistro.nome);
        this.form.controls["emailUsuario"].setValue(pRegistro.email);
        this.form.controls["senhaUsuario"].setValue(pRegistro.senha);
        this.form.controls["dataCriacao"].setValue(pRegistro.dataCriacao);
        
        this.aplicaValidacaoEmailRetorno(this.form.controls['emailUsuario'].value);
    }

    formatarSomenteLetras(nomeCampo: string, event:any): void{
        const valorTexto = this.utils.formatarSomenteLetras(event);

        this.form.get(nomeCampo)?.setValue(valorTexto);
    }

    aplicarValidacaoEmail(event: Event){
        const email = this.utils.aplicaValidacaoEmailEvento(event);

        if(email){
            this.form.get('emailUsuario')?.setErrors(null);
        }
        else{
            this.form.get('emailUsuario')?.setErrors({'emailInvalido': true});
        }
    }

    aplicaValidacaoEmailRetorno(valorEmailRetornado: string){
 
        const emailPattern = this.utils.aplicaValidacaoEmailRetorno(valorEmailRetornado);
 
        // Valida o e-mail retornado da api
        if(emailPattern){
            this.form.get('emailUsuario')?.setErrors(null);  // Remove erros se o formato for válido
            this.cdr.detectChanges();
        } else {
            this.form.get('emailUsuario')?.setErrors({ 'emailInvalido': true });  // Marca como inválido se não for válido
            this.cdr.detectChanges();
        }
 
        this.cdr.detectChanges();
 
    }

    get registro(): any[]{
        return this._registros;
    }


    confirmar() {
 
       
        const objUsuario = {
 
            Id: this.form.controls['id'].value ?? 0,  
            IdPerfil:this.form.controls['perfilUsuario'].value,
            Senha: this.form.controls['senhaUsuario'].value,              
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

    carregarComboPerfilUsuario(){
        this.servicePerfil.ObterTodosPerfis().subscribe(result =>{
            this.listaPerfilUsuarioFiltro = result.perfil;
        });
    }
}