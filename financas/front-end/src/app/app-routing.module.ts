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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
