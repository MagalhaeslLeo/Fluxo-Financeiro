import { Component, Input } from "@angular/core";
import { AbstractControl } from "@angular/forms";


@Component({
    selector: 'validacao-campo',
    templateUrl: './validacaoCampo.component.html',
    styleUrls: ['./validacaoCampo.component.css']
})
export class ValidacaoCampoComponent {
   
    
    @Input() control:AbstractControl|undefined;
    @Input() mensagens: any[]=[] ;
    

    constructor() {}

    
    //Retorna a msg de erro a partir do erro da da lista de mensagens do campo.
    obterMsg(pError:any| null | undefined):string{        
        if(pError){
            for(const msg of this.mensagens){        
                if(pError[msg.type]!=undefined){
                    return msg.msg;
                }
            }
        }

        //Quando se esquece o item de mensagem para a validação do campo adequadamente
        return "Valor inválido";
        
    }
}