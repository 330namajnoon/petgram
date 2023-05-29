import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorysViewRoutingModule } from './storys-view-routing.module';
import { StorysViewComponent } from './storys-view/storys-view.component';


@NgModule({
  declarations: [
    StorysViewComponent
  ],
  imports: [
    CommonModule,
    StorysViewRoutingModule
  ]
})
export class StorysViewModule { }
