import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileConfigRoutingModule } from 'src/routers/profile-config-routing.module';
import { ProfileConfigComponent } from 'src/components/profile-config/profile-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImgUploadModule } from './img-upload.module';

@NgModule({
  declarations: [
    ProfileConfigComponent,
   ],
  imports: [
    CommonModule,
    ProfileConfigRoutingModule,
    ReactiveFormsModule,
    ImgUploadModule,
    FormsModule
  ]
})
export class ProfileConfigModule { }
