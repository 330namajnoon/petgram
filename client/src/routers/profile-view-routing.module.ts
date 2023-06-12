import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileViewComponent } from 'src/components/profile-view/profile-view/profile-view.component';

const routes: Routes = [
  {path:"",component:ProfileViewComponent},
  {path:"profile_view/:id",component:ProfileViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileViewRoutingModule { }
