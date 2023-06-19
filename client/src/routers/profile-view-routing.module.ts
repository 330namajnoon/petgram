import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from 'src/components/profile-view/profile-view/profile-view.component';

const routes: Routes = [
  {path:"",component:ProfileViewComponent},
  {path:"profile_view",loadChildren:()=> import('../modules/profile-view.module').then(m => m.ProfileViewModule)},
  {path:"storys_view",loadChildren:()=> import('src/modules/storys-view.module').then(m => m.StorysViewModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileViewRoutingModule { }
