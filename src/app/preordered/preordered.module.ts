import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreorderedRoutingModule } from './preordered-routing.module';
import { PreorderedComponent } from './preordered/preordered.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PreorderedComponent
  ],
  imports: [
    CommonModule,
    PreorderedRoutingModule, 
    SharedModule
  ]
})
export class PreorderedModule { }
