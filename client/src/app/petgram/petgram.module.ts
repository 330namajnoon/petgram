import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetgramRoutingModule } from './petgram-routing.module';
import { MenuComponent } from './menu/menu.component';
import { MenuOptionComponent } from './menu/menu-option/menu-option.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuOptionComponent
  ],
  imports: [
    CommonModule,
    PetgramRoutingModule
  ]
})
export class PetgramModule { }
