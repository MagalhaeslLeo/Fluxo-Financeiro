import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BalanceteFinanceiroListaPage } from "./pages/balanceteFinanceiroLista/balanceteFinanceiroLista.page";
import { BalanceteFinanceiroDetPage } from "./pages/balanceteFinanceiroDet/balanceteFinanceiroDet.page";

const routes: Routes = [
{
    path: "lista",
    component: BalanceteFinanceiroListaPage,
},
 {
     path: "det",
     component: BalanceteFinanceiroDetPage,
 }
//  {
//      path: "det/:tipo/:idRegistro",
//      //component: BalanceteFinanceiroDetPage,
//  }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BalanceteFinanceiroRoutingModule{}
