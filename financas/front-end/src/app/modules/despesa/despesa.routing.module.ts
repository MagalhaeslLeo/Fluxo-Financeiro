import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DespesaListaPage } from "./pages/despesaLista/despesaLista.page";
import { DespesaDetPage } from "./pages/despesaDet/despesaDet.page";


const routes : Routes = [
    {
        path: "lista",
        component: DespesaListaPage
    },

     {
         path: "det",
         component: DespesaDetPage
     },

     {
         path: "det/:idRegistro",
         component: DespesaDetPage
     }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class DespesaRoutingModule {}