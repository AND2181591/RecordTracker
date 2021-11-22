import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { 
    path: 'home', 
    canLoad: [AuthGuard], 
    loadChildren: () => 
      import('./home/home.module').then(m => m.HomeModule)
  }, 
  {
    path: 'shipped', 
    canLoad: [AuthGuard], 
    loadChildren: () => 
      import('./shipped/shipped.module').then(m => m.ShippedModule)
  }, 
  {
    path: 'preordered', 
    canLoad: [AuthGuard], 
    loadChildren: () => 
      import('./preordered/preordered.module').then(m => m.PreorderedModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
