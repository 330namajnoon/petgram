import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUploadRoutingModule } from '../routers/img-upload-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UploadImgComponent } from 'src/components/upload-img/upload-img.component';


@NgModule({
  declarations: [UploadImgComponent],
  imports: [
    CommonModule,
    ImgUploadRoutingModule,
    ReactiveFormsModule
  ]
})
export class ImgUploadModule { }
