import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Utils } from "src/app/core/utils";
import { DespesaService } from "src/app/services/despesa.service";


@Component({
    selector: "despesaCadComponent",
    templateUrl: './despesaCad.component.html',
    styleUrls: ['./despesaCad.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DespesaCadComponent implements OnInit {
    ///Área de atributos objetos e variáveis
    form: FormGroup;
    listaTipoPagamentoFiltro: any[] = [];
    listaCartoesDisponiveisFiltro: any[] = [];
    result: any;
    idTipoPagamento: any;

    @Input() tipoCartaoCredito: boolean = true;
    IdUsuario: any;
    private _registros: any | undefined; 
    public msgValidacao: {[key: string]: any}



    ngOnInit(): void { }

    constructor(
        protected formBuilder: FormBuilder,
        protected router: ActivatedRoute,
        protected route: Router,
        protected utils: Utils,
        protected cdr: ChangeDetectorRef,
        protected service: DespesaService
    ) {
        this.form = this.criarForm();
        this.msgValidacao = this.criarMensagensValidacao();
        this.atualizarRegistro();
    }

    private criarForm(): FormGroup {
        return this.formBuilder.group(
            {
                id: [null, []],
                descricaoDespesa: [null, Validators.required],
                tipoPagamento: [null, Validators.required],
                valorDespesa: [null, Validators.required],
                dataCriacao: [null, Validators.required]
            },
            { updateOn: "change" }
        );
    }

    private criarMensagensValidacao(): {[key:string]: any}{
        return {
            'descricaoDespesa': [
                {
                    type: 'required',
                    msg: 'Preenchimento obrigatório'
                }
            ],
            'valorDespesa': [
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
            'tipoPagamento':[
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
                this.carregarComboTipoPagamento();       
               //Preenche o form com os dados do regsitro
                this.preencherFormCompleto(this._registros);

 
 
             });
        } else {
 
            //Nao recebeu ID, então considera uma inserção e Cria o registro vazio ou com dados default.
            this._registros = {};
            this.carregarComboTipoPagamento();
            //Preenche o form com os dados do registro
            this.preencherForm(this._registros);
 
        }
    }

    private preencherForm(pRegistro: any): void{
        this.form.patchValue(pRegistro);
    }

    public preencherFormCompleto(pRegistro: any): void{
        this.form.controls["id"].setValue(pRegistro.id);
        this.form.controls["descricaoDespesa"].setValue(pRegistro.descricao);
        this.idTipoPagamento = pRegistro.tipoPagamentoVO.idTipoPagamentoVO;
        this.form.controls["valorDespesa"].setValue(pRegistro.valor);
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
 
       
        const objDespesa = {
 
            Id: this.form.controls['id'].value ?? 0,  
            DescricaoDespesa: this.form.controls['descricaoDespesa'].value,              
            TipoPagamento: this.form.controls['tipoPagamento'].value,
            ValorDespesa: this.form.controls['valorDespesa'].value,            
            DataCriacao: this.form.controls['dataCriacao'].value,
            Deletado: false,
 
        }
 
        //Verifica se há campos inválidos
        if (this.utils.validarForm(this.form)) {
 
            //Chama o service para a persistencia, passando os dados do FORM como parametro
             this.service.PersistirDespesa(objDespesa).subscribe((result) => {
                 this.result = result;
                 this._registros = result;
                 this.utils.exibirSucesso("Registro salvo com sucesso.");
                 this.form.markAsPristine();
                 this.cdr.detectChanges();
                 //this.route.navigate(["usuario", "cad", result.id]);
                 this.route.navigate(["despesa", "lista"]);
 
            });
 
        } else {
            //Exibe a mensagem indicando que há campos inválidos no form
            this.utils.exibirWarning('Há pendências no preenchimento no formulário.');
        }
    }
    cancelar(): void{
        this.route.navigate(["despesa", "lista"]);
    }

    carregarComboTipoPagamento() {
        this.service.ObterTiposPagamentos().subscribe(result => {
            this.listaTipoPagamentoFiltro = result.sort((a: any, b: any) =>
                a.descricao.localeCompare(b.descricao, 'pt-BR', { sensitivity: 'base' })
            );
            this.form.controls["tipoPagamento"].setValue(this.idTipoPagamento);
    
            this.cdr.detectChanges();
        });
    }
    
    carregarComboCartoesDisponiveis(){
        this.listaTipoPagamentoFiltro.forEach(element => {
            if(element.Id === 3 && element.tipoPagamento === 'Cartão de Crédito'){
                this.service.ObterCartoesPorUsuario(this.IdUsuario).subscribe(result=>{
                    this.listaCartoesDisponiveisFiltro = result;
                    this.tipoCartaoCredito = false;
                    this.cdr.detectChanges();
                });
            }
        });
        
    }
}