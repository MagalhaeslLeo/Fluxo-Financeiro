import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuPage } from "./pages/menu/menu.page";
 
const routes : Routes = [
    {
        path: "lista",
        component: MenuPage
    },
 
    // {
    //     path: "cad",
    //     component: UsuarioCadPage
    // },
 
    // {
    //     path: "cad/:idRegistro",
    //     component: UsuarioCadPage
    // }
 
]
 
 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
 
 
export class HomeRoutingModule {}
 