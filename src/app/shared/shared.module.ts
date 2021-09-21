import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FlexLayoutModule, 
    MaterialModule
  ], 
  exports: [
    FlexLayoutModule, 
    MaterialModule, 
    InputComponent
  ]
})
export class SharedModule { }
