import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetgramRoutingModule } from '../routers/petgram-routing.module';
import { MenuComponent } from '../components/menu/menu.component';
import { MenuOptionComponent } from '../components/menu/menu-option/menu-option.component';




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
