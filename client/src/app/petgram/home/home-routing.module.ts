import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {path:"",component:HomeComponent,children:[
    {path:"comments/:id",component:CommentsComponent},
    {path:"profile_view/:id",loadChildren:()=> import("../profile-view/profile-view.module").then(m => m.ProfileViewModule)}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
