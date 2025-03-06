import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
   {
     path: '',
     redirectTo: 'home',
     pathMatch: 'full'
   },
   {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(h=>h.HomeModule)
  },
   {
     path: 'usuario',
     loadChildren: () => import('./modules/usuario/usuario.module').then(u=>u.UsuarioModule)
   },
   {
    path: 'despesa',
    loadChildren: () => import('./modules/despesa/despesa.module').then(u=>u.DespesaModule)
  },
  {
    path: 'receita',
    loadChildren: () => import('./modules/receita/receita.module').then(u=>u.ReceitaModule)
  },
  {
    path: 'balanceteFinanceiro',
    loadChildren: () => import('./modules/balanceteFinanceiro/balanceteFinanceiro.module').then(u=>u.BalanceteFinanceiroModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(l=>l.LoginModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
