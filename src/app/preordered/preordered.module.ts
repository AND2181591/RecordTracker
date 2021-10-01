import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreorderedRoutingModule } from './preordered-routing.module';
import { PreorderedComponent } from './preordered/preordered.component';


@NgModule({
  declarations: [
    PreorderedComponent
  ],
  imports: [
    CommonModule,
    PreorderedRoutingModule
  ]
})
export class PreorderedModule { }
