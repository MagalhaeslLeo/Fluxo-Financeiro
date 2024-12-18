import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsuarioListaPage } from "./pages/usuarioLista/usuarioLista.page";
import { UsuarioCadPage } from "./pages/usuarioCad/usuarioCad.page";

const routes : Routes = [
    {
        path: "lista",
        component: UsuarioListaPage
    },

    {
        path: "cad",
        component: UsuarioCadPage
    },

    {
        path: "cad/:idRegistro",
        component: UsuarioCadPage
    }

]


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class UsuarioRoutingModule {}