import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceitaListaPage } from "./pages/receitaLista/receitaLista.page";
import { ReceitaDetPage } from "./pages/receitaDet/receitaDet.page";
import { ReceitaListaDetPage } from "./pages/receitaListaDet/receitaListaDet.page";
import { FonteRendaCadDialog } from "./components/dialogs/fonteRendaCad.dialog";


const routes : Routes = [
    {
        path: "lista",
        component: ReceitaListaPage
    },

     {
         path: "det",
         component: ReceitaDetPage
     },

     {
         path: "det/:idRegistro",
         component: ReceitaDetPage
     },
     {
        path: "listaDet",
        component: ReceitaListaDetPage
     },
     {
        path: "fonteRendaCad",
        component: FonteRendaCadDialog
     }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class ReceitaRoutingModule {}