import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorysRoutingModule } from './storys-routing.module';
import { StorysComponent } from './storys/storys.component';


@NgModule({
  declarations: [
    StorysComponent
  ],
  imports: [
    CommonModule,
    StorysRoutingModule
  ]
})
export class StorysModule { }
