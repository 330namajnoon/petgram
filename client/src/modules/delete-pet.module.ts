import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeletePetComponent } from 'src/components/profile-config/delete-pet/delete-pet.component';
import { FormsModule } from '@angular/forms';
import { DeletePetRoutingModule } from 'src/routers/delete-pet-routing.module';



@NgModule({
  declarations: [DeletePetComponent],
  imports: [
    CommonModule,
    DeletePetRoutingModule,
    FormsModule

  ]
})
export class DeletePetModule { }
