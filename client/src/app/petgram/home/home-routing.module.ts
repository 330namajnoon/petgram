import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CommentsComponent } from './comments/comments.component';
const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"comments/:id",component:CommentsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
