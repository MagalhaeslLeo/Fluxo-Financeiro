import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BalanceteFinanceiroListaPage } from "./pages/balanceteFinanceiroLista/balanceteFinanceiroLista.page";
import { BalanceteFinanceiroDetPage } from "./pages/balanceteFinanceiroDet/balanceteFinanceiroDet.page";

const routes: Routes = [
{
    path: ":periodo/:tipo/lista",
    component: BalanceteFinanceiroListaPage,
},
 {
     path: ":periodo/:tipo/det",
     component: BalanceteFinanceiroDetPage,
 },
{
      path: ":periodo/:tipo/det/:idRegistro",
      component: BalanceteFinanceiroDetPage,
}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BalanceteFinanceiroRoutingModule{}
