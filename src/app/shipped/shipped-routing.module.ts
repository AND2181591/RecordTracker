import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippedComponent } from './shipped/shipped.component';

const routes: Routes = [
  { path: '', component: ShippedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippedRoutingModule { }
