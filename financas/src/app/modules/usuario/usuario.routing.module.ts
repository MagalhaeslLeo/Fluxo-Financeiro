import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioListaPage } from "./pages/usuarioLista";

const routes : Routes = [
    {
        path: "lista",
        component: UsuarioListaPage
    }
]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class UsuarioRoutingModule {}