import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Modules/home/home.component';
import { GuardAuth } from './Guards/guard-auth';

const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: HomeComponent },
  {
    path: 'dashboard',
    loadChildren: () => import('./Modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [GuardAuth]
  },
  {
    path: 'products',
    loadChildren: () => import('./Modules/product/product.module').then(m => m.ProductModule),
    canActivate: [GuardAuth]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
