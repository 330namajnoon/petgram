import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImgComponent } from 'src/components/upload-img/upload-img.component';

const routes: Routes = [
  {path:'upload-img' , component: UploadImgComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImgUploadRoutingModule { }
