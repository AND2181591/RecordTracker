import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippedRoutingModule } from './shipped-routing.module';
import { ShippedComponent } from './shipped/shipped.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShippedComponent
  ],
  imports: [
    CommonModule,
    ShippedRoutingModule, 
    SharedModule
  ]
})
export class ShippedModule { }
