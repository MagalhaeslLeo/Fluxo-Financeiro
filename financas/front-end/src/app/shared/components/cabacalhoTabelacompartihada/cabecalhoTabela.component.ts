import { SelectionModel } from "@angular/cdk/collections";
import { Component, Input, EventEmitter, Output } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";

@Component({
    selector: 'cabecalhoTabela',
    templateUrl: './cabecalhoTabela.component.html',
    styleUrls: ['./cabecalhoTabela.component.scss']
})
export class CabecalhoTabelaComponent {
    constructor() { }

    //Fonte de dados para a tabela. Ela é usada para contar o número de registros e exibir essa contagem.
    @Input() dataSource: MatTableDataSource<any> | null = null;

    // Gerencia a seleção de registros na tabela.
    @Input() selection: SelectionModel<any> | null = null;
    

    //O componente tem várias propriedades @Input e @Output, que são fundamentais para receber e passar dados(INPUT) e emitir eventos para componentes pais(OUTPUT)
   
    //Variáveis booleanas que controlam a exibição dos botõe
    @Input() exibeInserir:boolean=true;
    @Input() exibeExcluir:boolean=true;
    @Output() excluir = new EventEmitter<any[]>();
    @Input() exibeAlterar:boolean=true;
    @Input() exibeAtualizar:boolean=true;
    @Input() exibeMenuOpcoes: boolean = true; 
    
    //Cada uma dessas propriedades é um EventEmitter para emitir eventos específicos de cada ação
    @Output() inserir = new EventEmitter();
    @Output() alterar = new EventEmitter<any>();
    @Output() atualizar = new EventEmitter();
   

    //Área de métodos que emitem eventos quando os botões correspondentes são clicados 

    //Dispara o evento inserir, para que o componente pai possa reagir ao clique no botão de inserir.
    inserirClick() {
        this.inserir.emit();
    }

    //Dispara o evento excluir, passando os itens selecionados,como parâmetro para que o componente pai possa excluir os registros escolhidos.
    excluirClick() {
        this.excluir.emit(this.selection?.selected);
    }
    
    //Dispara o evento alterar, passando os itens selecionados para que o componente pai possa modificar os registros escolhidos.
    alterarClick() {
        this.alterar.emit(this.selection?.selected);
    }

    //Dispara o evento atualizar para que o componente pai possa atualizar as informações da tabela.
    atualizarClick() {
        this.atualizar.emit();
    }

    //Getters textoRegistros e textoSelecionados Esses getters são responsáveis por retornar mensagens dinâmicas sobre os registros exibidos e selecionados

    //Retorna uma string com o número total de registros na tabela.
    get textoRegistros() {

        //Verifica se dataSource e dataSource.data estão definidos
        if (!this.dataSource || !this.dataSource.data || !this.dataSource.data) {
            return "<<Filtro Pendente>>";
        } else {
            if (this.dataSource.data.length == 1) {
                return "1 registro";

            } else {
                if (this.dataSource.data.length > 1) {
                    return this.dataSource.data.length + " registros";

                } else {
                    return "<<Nenhum registro encontrado>>";
                }
            }
        }

    }


    //Retorna uma string com o número de registros selecionados na tabela.
    get textoSelecionados() {

        //Verifica se selection está definido e se há registros selecionados
        if (this.selection) {
            if (this.selection.selected.length > 1) {
                return this.selection.selected.length + " selecionados";
            }
            if (this.selection.selected.length == 1) {
                return "1 selecionado";
            }
        }
        return "nenhum selecionado"
    }

}