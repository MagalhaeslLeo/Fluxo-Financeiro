import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";
import { ReceitaService } from "src/app/services/receita.service";
import { FonteRendaService } from "src/app/services/fonteRenda.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "fonteRendaCadDialog",
    templateUrl: './fonteRendaCad.dialog.html',
    styleUrls: ['./fonteRendaCad.dialog.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class FonteRendaCadDialog implements OnInit {
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
        protected cdr: ChangeDetectorRef,
        protected service: ReceitaService,
        protected serviceFonteRenda: FonteRendaService,
        public dialogRef : MatDialogRef<FonteRendaCadDialog>,
        @Inject(MAT_DIALOG_DATA) public data : any 
    ) {
        this.form = this.criarForm();
        this.msgValidacao = this.criarMensagensValidacao();
        this.atualizarRegistro();
    }

    private criarForm(): FormGroup {
        return this.formBuilder.group(
            {
                id: [null, []],
                descricao: [null, Validators.required],
                dataCriacao: [null, Validators.required]
            },
            { updateOn: "change" }
        );
    }

    private criarMensagensValidacao(): {[key:string]: any}{
        return {
            'descricao':[
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
            ]
        }
    }

    atualizarRegistro() {
 
        //Obtem o ID do registro via parametro da rota
        const lIdStr: any = this.data.idRegistro;
 
        //Se recebeu o ID é para preencher o form com o registro relacionado
        if (lIdStr) {
 
            // Chama o service para obter o registro a partir do seu ID
             this.serviceFonteRenda.ObterPorId(parseInt(lIdStr)).subscribe((result) => {
 
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

    private preencherForm(pRegistro: any): void{
        this.form.patchValue(pRegistro);
    }

    public preencherFormCompleto(pRegistro: any): void{
        this.form.controls["id"].setValue(pRegistro.id);
        this.form.controls["descricao"].setValue(pRegistro.descricao);
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
 
       
        const objFonteRenda = {
 
            Id: this.form.controls['id'].value ?? 0,           
            Descricao: this.form.controls['descricao'].value,
            DataCriacao: this.form.controls['dataCriacao'].value,
            Deletado: false,
 
        }
 
        //Verifica se há campos inválidos
        if (this.utils.validarForm(this.form)) {
 
            //Chama o service para a persistencia, passando os dados do FORM como parametro
             this.serviceFonteRenda.PersistirFonteRenda(objFonteRenda).subscribe((result) => {
                 this.result = result;
                 this._registros = result;
                 this.utils.exibirSucesso("Registro salvo com sucesso.");
                 this.dialogRef.close('true');
                //  this.form.markAsPristine();
                //  this.cdr.detectChanges();
                 //this.route.navigate(["usuario", "cad", result.id]);
                 //this.route.navigate(["receita", "det"]);
 
            });
 
        } else {
            //Exibe a mensagem indicando que há campos inválidos no form
            this.utils.exibirWarning('Há pendências no preenchimento no formulário.');
        }
    }
    cancelar(): void{
        this.dialogRef.close();
        //this.route.navigate(["receita", "det"]);
    }
}