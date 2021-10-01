import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShippedRoutingModule } from './shipped-routing.module';
import { ShippedComponent } from './shipped/shipped.component';


@NgModule({
  declarations: [
    ShippedComponent
  ],
  imports: [
    CommonModule,
    ShippedRoutingModule
  ]
})
export class ShippedModule { }
