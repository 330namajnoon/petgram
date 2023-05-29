import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from './profile-view/profile-view.component';

const routes: Routes = [
  {path:"",component:ProfileViewComponent},
  {path:"profile_view/:id",component:ProfileViewComponent,children:[
    {path:"storys_view",loadChildren:()=> import('./profile-view.module').then(m => m.ProfileViewModule)}

  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileViewRoutingModule { }
