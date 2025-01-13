import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReceitaListaPage } from "./pages/receitaLista/receitaLista.page";


const routes : Routes = [
    {
        path: "lista",
        component: ReceitaListaPage
    },

    // {
    //     path: "det",
    //     //component: ReceitaDetPage
    // },

    // {
    //     path: "det/:idRegistro",
    //     //component: ReceitaDetPage
    // }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class ReceitaRoutingModule {}