import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreorderedComponent } from './preordered/preordered.component';

const routes: Routes = [
  { path: '', component: PreorderedComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreorderedRoutingModule { }
