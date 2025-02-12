import { Location } from '@angular/common';
import { HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Params, Router } from "@angular/router";
import * as moment from 'moment';
import { ToastrService } from "ngx-toastr";
 import { debounceTime, tap } from "rxjs";
import { AguardeDialog } from "../shared/dialogs/aguarde/aguarde.dialog";
import { ConfirmacaoDialog } from "../shared/dialogs/confirmacao/confirmacao.dialog";
import { ErroConfirmacaoDialog } from "../shared/dialogs/erroConfirmacao/erroConfirmacao.dialog";
type SortDirection = 'asc' | 'desc';

//Classe com funcionalidades utilitárias que podem ser reaproveitadas em diversas telas
@Injectable()
export class Utils {

    constructor(
        protected route: ActivatedRoute,
        protected router: Router,
        private toastr: ToastrService,
        public dialog: MatDialog,
        protected location: Location) {
    }

    //Formatada para mensagens de confirmação de operações bem sucedidas(ex.: Registro excluído com sucesso)
    exibirSucesso(msg: string) {
        setTimeout(() => this.toastr.success(msg, ''));
    }

    //Formatada para mensagens de erro
    exibirErro(msg: string) {
        setTimeout(() => this.toastr.error(msg, ''));
    }

    //Mensagens de alerta(ex.: sua senha expirará em 2 dias)
    exibirWarning(msg: string) {
        setTimeout(() => this.toastr.warning(msg, ''));
    }

    //Informações relevantes para o usuario(ex.: dois novos processos disponíveis)
    exibirInformacao(msg: string) {
        setTimeout(() => this.toastr.info(msg, ''));
    }

    //Método que obtém a resposta dos resolvers.
    get respResolvers() {
        return this.route.snapshot.data
    }
    //Método que obtém a resposta dos resolvers.
    get parentRespResolvers() {
        return this.route.parent?.snapshot.data
    }

     formatarData(pIsoDate: string) {
         if (pIsoDate != null && pIsoDate != "undefined") {
             return moment(pIsoDate, moment.ISO_8601).format('DD/MM/YYYY');
         } else {
             return '';
         }
     }

    // formatarDataHora(pIsoDate: string) {
    //     if (pIsoDate != null) {
    //         //return moment(pIsoDate, moment.ISO_8601).format('DD/MM/YYYY HH:mm');
    //     } else {
    //         return '';
    //     }
    // }

    // public formatarHora(pIsoDate: string) {
    //     if (pIsoDate != null) {
    //         //return moment(pIsoDate, moment.ISO_8601).format('HH:mm');
    //     } else {
    //         return null;
    //     }
    // }
    
    formatarInteiro(event: Event): string {
        const input = event.target as HTMLInputElement;
        const valor = input.value.replace(/\D/g, ''); // Remove todos caracteres que não for número
    
        return valor;
    }
    
    formatarSomenteLetras(event: Event): string {
        const inputElement = event.target as HTMLInputElement;
        const texto = inputElement.value.replace(/[^a-zA-Z]/g, "");
        
        return texto;
    }

    aplicaValidacaoEmailEvento(event: Event): string {
        const inputElement = event.target as HTMLInputElement;
        let email = inputElement.value;
   
        // Expressão regular para validar o formato do e-mail
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
        // Verifica se o e-mail está no formato correto
        if (emailPattern.test(email)) {
            // Se for válido, retorna o próprio e-mail
            return email;
        } else {
            // Caso contrário, você pode retornar uma mensagem ou o valor original
            return ''; // Ou qualquer outra ação desejada (como limpar ou mostrar um erro)
        }
    }
 
    aplicaValidacaoEmailRetorno(valorRetornado: string): string {
       
        let email = valorRetornado;
   
        // Expressão regular para validar o formato do e-mail
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   
        // Verifica se o e-mail está no formato correto
        if (emailPattern.test(email)) {
            // Se for válido, retorna o próprio e-mail
            return email;
        } else {
            // Caso contrário, você pode retornar uma mensagem ou o valor original
            return ''; // Ou qualquer outra ação desejada (como limpar ou mostrar um erro)
        }
    }


    verificarArray(valor: any){
      const array = Array.isArray(valor) ? valor : [valor];
        return array;
    }

    converterValorNumerico(valor: string) {
        
        const valorNegativo = valor.includes('-');

        // Converte o valor para string, caso não seja
        let valorString = String(valor);
    
        // Remove todos os caracteres não numéricos
        valorString = valorString.replace(/[^\d]/g, '');
    
        // Converte para número, divide por 100 para ajustar as casas decimais e formata com duas casas decimais
        let valorNumerico = (parseFloat(valorString) / 100);

        if(valorNegativo)
        {
            valorNumerico *= -1;
        }
    
        return valorNumerico.toFixed(2);
    }

    formatarCampoMonetario(event: any, permiteNegativo: boolean = false) {
        const input = event.target;
        let value = input.value;

        // Verifica se digitou valor negativo
       const valorNegativo = ((parseInt(value.replace(/[^\d]/g, '')) === 0 && event.data === null) ? false : value.includes('-'));

        // Remove todos os caracteres não numéricos, exceto o sinal de menos
        value = value.replace(/[^\d]/g, '');

        // Converte para número e aplica a divisão por 100
        value = (value) ? (parseInt(value, 10) / 100).toFixed(2) : "0.00"; // Define o valor como 0.00 se estiver vazio
    
        // Formata o valor, substituindo o ponto por vírgula e adicionando os separadores de milhar        
        const valorMonetario = `${value.replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.')}`;

        let valorFormatado = `${valorMonetario}`;
    
        if(permiteNegativo && valorNegativo && (value !== "0.00" || value !== "0,00")){
            valorFormatado = `-${valorMonetario}`;
        }
    
        input.value = valorFormatado;
    }

    formatarValorMonetario(valor: any){
        
        valor = Math.abs(Math.round(valor * 100)); // Remove o sinal negativo e arredonda

        let vlString = String(valor);
        
        // Converte para número e aplica a divisão por 100
        vlString = (vlString) ? (parseInt(vlString, 10) / 100).toFixed(2) : "0.00"; // Define o valor como 0.00 se estiver vazio
    
        // Formata o valor, substituindo o ponto por vírgula e adicionando os separadores de milhar
        const valorFormatado = `${vlString.replace('.', ',').replace(/\d(?=(\d{3})+,)/g, '$&.')}`;
    
        return valorFormatado;
    }

    //Obtem o valor de um parâmetro recebido na rota corrente
    public obterParametro(pParametro: string): string | undefined {
        const lParametro = this.route.snapshot.paramMap.get(pParametro);
        if (lParametro != null && lParametro != "undefined") {
            return lParametro;
        } else {
            return undefined;
        }
    }

    //Atualiza a tela corrente
    reload() {
        window.location.reload();

    }

    //Ordena um array de objetos com base nos nomes dos atributos e direção()
    sort(records: Array<any>, atributos: string[], direction: SortDirection): any {
        let directions: number[];
        if (direction == "asc") {
            directions = [1];
        } else {
            if (direction == "desc") {
                directions = [-1];
            }
        }
        return records.sort(function (a, b) {
            for (let i = 0; i < atributos.length; i++) {
                if (a[atributos[i]] < b[atributos[i]]) {
                    return -1 * directions[i]
                }
                else if (a[atributos[i]] > b[atributos[i]]) {
                    return 1 * directions[i];
                }
            }
            return 0;
        });
    }

    //retorna a rota atual, incluindo a URL e seus parametros
    obterRotaAtual() {
        const lParams = this.obterParamsRotaCorrente();
        return [this.obterUrlRotaAtual(), lParams];
    }

    obterUrlRotaAtual(): string {
        //Retorna a url da rota atual, sem os parametros
        const lIndex = this.router.url.indexOf(';');
        if (lIndex >= 0) {
            //A partir do ';' vem os parametros que devem ser desconsiderados
            return this.router.url.substring(0, this.router.url.indexOf(';'));
        } else {
            return this.router.url;
        }
    }

    obterParamsRotaCorrente(): Params {
        return this.route.snapshot.params;
    }

    //Provoca o refresh do browser na rota corrente
    atualizar() {
        this.router.navigate(this.obterRotaAtual(), { replaceUrl: true });
    }

    abrirDialogAguarde(): MatDialogRef<AguardeDialog> {
        const dialogRef = this.dialog.open(AguardeDialog, {
            width: '250px',
            disableClose: true, restoreFocus: true, autoFocus: false, closeOnNavigation: true, hasBackdrop: true
        }
        );
        return dialogRef;
    }

    abrirDialogConfirmacaoCustom(pMsg: string, pWidth: string, pHeight: string): MatDialogRef<ConfirmacaoDialog> {
        //Verifica se tem ao menos um item selecionado e abre o modal para confirmar a exclusão
        let dialogRef = null;
        dialogRef = this.dialog.open(ConfirmacaoDialog, {
            width: pWidth,
            height: pHeight,
            data: { msg: pMsg },
            autoFocus: true, disableClose: true, hasBackdrop: true
        })
        return dialogRef;
    }

    abrirDialogErroConfirmacao(pMsg: string): MatDialogRef<ErroConfirmacaoDialog> {
        let dialogRef = null;
        dialogRef = this.dialog.open(ErroConfirmacaoDialog, {
            maxWidth: '450px',
            data: { msg: pMsg },
            autoFocus: true, disableClose: true, hasBackdrop: true
        })
        return dialogRef;
    }

    abrirDialogConfirmacao(pMsg: string): MatDialogRef<ConfirmacaoDialog> {
        //Verifica se tem ao menos um item selecionado e abre o modal para confirmar a exclusão
        let dialogRef = null;
        dialogRef = this.dialog.open(ConfirmacaoDialog, {
            width: '250px',
            data: { msg: pMsg },
            autoFocus: true, disableClose: true, hasBackdrop: true
        })
        return dialogRef;
    }

    voltar(): void {
        this.location.back();
    }

    irParaHome() {
        this.router.navigate(['/', 'home']);
    }

    /** 
     * Trata o autocomplete para campos de objetos que repesentam entidades com ID
     * @pFormControlEntidade Campo que contem a instancia do ojeto selecionado
     * @pFormControlIdEntidade Campo que contem o ID da instancia do objeto selecionado
     * @pFuncaoPreenchimento Função responsável por obter os registros de um `Autocomplete` a partir do termo digitado
     * @pTamanhoMinimo Quantidade mínima de caractere digitado para efetuar a requisição
     * Exemplo:  no construtor, this.utils.tratarAutoCompleteEntidade(this.form.controls["entidade"], this.form.controls["idEntidade"], this.atualizarNomesAuto.bind(this));

    */
    public tratarAutoCompleteEntidade(
         pFormControlEntidade: AbstractControl,
         pFormControlIdEntidade: AbstractControl,
         pFuncaoPreenchimento: any, pTamanhoMinimo: number = 4,
         pDebounceTime: number = 500) {
        //Inicia o id com o id da entidade recebida.
        if (pFormControlEntidade.value) {
            pFormControlIdEntidade.setValue(pFormControlEntidade.value.id);
        } else {
            pFormControlIdEntidade.reset();
        }
        pFormControlEntidade
            .valueChanges
            .pipe(
                //Desconsidera repeticoes com menos tempo que o configurado
                debounceTime(pDebounceTime),
                tap(async pValue => {
                    if (pValue && pValue.length >= pTamanhoMinimo && pValue != null && pValue.toString() != '') {
                        //Chama a funcao que preencherá a lista de autocomplete a partir do termo desejado
                        pFuncaoPreenchimento(pValue);
                    } else {
                        pFuncaoPreenchimento('');
                    }
                })
            ).subscribe(entidade => {
                //Na mudança do autocomplete, atualiza o id associado
                if (entidade != null && entidade.id) {
                    pFormControlIdEntidade.setValue(entidade.id);
                } else {
                    //Se não achou o item, limpa o campo de id
                    pFormControlIdEntidade.reset();
                }
            })
    }

    //Realiza download a partir de resposta de um http(webservice)
    downloadResponse(pRespBlob: HttpResponse<Blob>, pFileName?: string) {
        //Nome do arquivo obtido do blob
        const lFileNameBlob = this.getFileName(pRespBlob);
        //Faz o download
        this.downloadBlob(new Blob([pRespBlob.body as BlobPart]), pFileName ? pFileName : (lFileNameBlob ? lFileNameBlob : 'arquivo'));
    }

    //Realiza o download de um arquivo a partir de um File
    downloadFile(pNomeArquivo: string, pFile: File) {
        const blob = new Blob([pFile], { type: pFile.type });
        this.downloadBlob(blob, pNomeArquivo);
    }

    //Realiza o download a partir do Blob recebidoF
    downloadBlob(pBlob: Blob, pFileName: string) {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(pBlob);
        a.download = pFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    //Obtem o nome do arquivo a partir do blob recebido(content-disposition)
    public getFileName(pBlobResp: HttpResponse<Blob>): string | null {
        const contentDisposition: string | null = pBlobResp.headers.get('content-disposition');
        if (contentDisposition) {
            return contentDisposition.substring(contentDisposition.indexOf("=") + 1, contentDisposition.length).trim();
        } else {
            return null;
        }
    }

    /**
     * Retorna uma string sem acentuação e caracteres especiais.
     * @param pTermo - A string a ser processada.
     * @returns A string processada.
     */
    public removerAcentuacao(pTermo: string): string {
        // Verifica se o termo é válido.
        if (!pTermo) {
            return pTermo;
        }
        // Remove a acentuação.
        const lTermoSemAcentuacao = pTermo.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        // Remove caracteres especiais.
        const lTermoFinal = lTermoSemAcentuacao.replace(/[^a-zA-Z0-9\s]/g, "");
        return lTermoFinal;
    }

    //Forca a validação dos campos do form recebido como parâmetro
    validarForm(pFormGroup: FormGroup): boolean {
        pFormGroup.markAsTouched({ onlySelf: true });
        Object.keys(pFormGroup.controls).forEach(key => {
            pFormGroup.controls[key].markAsTouched({ onlySelf: true });
        });
        return pFormGroup.valid;
    }

    public recarregarForm(pFormGroup: FormGroup) {
        pFormGroup.markAsPristine();
    }

    public capitalizeText(text: string): string {
        return text
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    public removeDuplicados(pRegistros: any[], pCampoExtra?: string): any[]{

        //Remove duplicados pelo id
        const setIds = new Set();
        const listaSemDuplicados = pRegistros.filter(item =>{
            if(setIds.has(item.id)) return false;
            setIds.add(item.id);
            return true;
        });

        //Remove duplicados pelo parâmetro extra
        if(pCampoExtra){
            const setCampoExtra = new Map();
        return listaSemDuplicados.filter(item =>{
            const chaveRegistro = pCampoExtra.split('.').reduce((obj, key)=>obj?.[key], item);
            if(!setCampoExtra || setCampoExtra.has(chaveRegistro)) return false;
            setCampoExtra.set(chaveRegistro, item);
            return true;
        });
        }
        return listaSemDuplicados;
        
    }

}