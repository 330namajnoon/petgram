import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home/home.component';
import { CommentsComponent } from '../components/home/comments/comments.component';

const routes: Routes = [
  {path:"",component:HomeComponent,children:[
    {path:"comments/:id",component:CommentsComponent},
    // {path:"profile_view",loadChildren:()=> import("../profile-view/profile-view.module").then(m => m.ProfileViewModule)},
    // {path:"profile_view/storys_view",loadChildren:()=> import('../storys-view/storys-view.module').then(m => m.StorysViewModule)}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
