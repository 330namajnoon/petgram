import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImgComponent } from 'src/components/profile-config/upload-img/upload-img.component';
import { ProfileConfigComponent } from 'src/components/profile-config/profile-config.component';
import { DeletePetComponent } from 'src/components/profile-config/delete-pet/delete-pet.component';
const routes: Routes = [
  {
    path: "", component: ProfileConfigComponent,
    children: [
      { path: "upload-img", component: UploadImgComponent },
      {path: "delete-pet" , component: DeletePetComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileConfigRoutingModule { }
