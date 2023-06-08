import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorysViewComponent } from './storys-view/storys-view.component';
import { CommentsComponent } from './storys-view/comments/comments.component';
const routes: Routes = [
  {path:"",component:StorysViewComponent,children:[
    {path:"commends",component:CommentsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorysViewRoutingModule { }
