import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorysComponent } from './storys/storys.component';
import { NewStoryComponent } from './new-story/new-story.component';
import { StoryComponent } from '../storys-view/storys-view/story/story.component';
const routes: Routes = [
  {path:"",component:StorysComponent,children: [
    {path:"view",loadChildren:()=> import("../profile-view/profile-view.module").then(m => m.ProfileViewModule)},
    {path:"view/storys_view",loadChildren:()=> import('../storys-view/storys-view.module').then(m => m.StorysViewModule)},
    {path:"view/new",component:NewStoryComponent},
    {path:"view/new/story",loadChildren:()=> import("../storys-view/storys-view.module").then(m => m.StorysViewModule)}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorysRoutingModule { }
