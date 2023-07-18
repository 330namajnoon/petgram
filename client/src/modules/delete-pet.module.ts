import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeletePetRoutingModule } from 'src/routers/delete-pet-routing.module';
import { DeletePetComponent } from 'src/components/profile-config/delete-pet/delete-pet.component';



@NgModule({
  declarations: [DeletePetComponent],
  imports: [
    CommonModule,
    DeletePetRoutingModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class DeletePetModule { }
