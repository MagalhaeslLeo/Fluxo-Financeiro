import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BalanceteFinanceiroListaPage } from "./pages/balanceteFinanceiroLista/balanceteFinanceiroLista.page";

const routes: Routes = [
{
    path: "lista",
    component: BalanceteFinanceiroListaPage,
},
// {
//     path: "det/:tipo",
//     //component: BalanceteFinanceiroDetPage,
// },
// {
//     path: "det/:tipo/:idRegistro",
//     //component: BalanceteFinanceiroDetPage,
// }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BalanceteFinanceiroRoutingModule{}
