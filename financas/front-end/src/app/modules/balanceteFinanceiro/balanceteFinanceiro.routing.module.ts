import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
{
    path: "lista/:tipo",
    //component: BalanceteFinanceiroListaPage,
},
{
    path: "det/:tipo",
    //component: BalanceteFinanceiroDetPage,
},
{
    path: "det/:tipo/:idRegistro",
    //component: BalanceteFinanceiroDetPage,
}
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BalanceteFinanceiroRoutingModule{}
