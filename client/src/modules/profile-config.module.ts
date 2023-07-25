import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileConfigRoutingModule } from 'src/routers/profile-config-routing.module';
import { ProfileConfigComponent } from 'src/components/profile-config/profile-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgUploadModule } from './img-upload.module';
import { SelectComponent } from 'src/components/profile-config/select/select.component';
import { OptionComponent } from 'src/components/profile-config/select/option/option.component';
import { DeletePetModule } from './delete-pet.module';
@NgModule({
  declarations: [
    ProfileConfigComponent,
    SelectComponent,
    OptionComponent
   ],
  imports: [
    CommonModule,
    ProfileConfigRoutingModule,
    ReactiveFormsModule,
    ImgUploadModule,
    DeletePetModule,
    FormsModule
  ]
})
export class ProfileConfigModule { }
