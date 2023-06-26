import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorysComponent } from 'src/components/storys/storys/storys.component';
import { NewStoryComponent } from 'src/components/storys/new-story/new-story.component';
const routes: Routes = [
  {path:"",component:StorysComponent,children: [
    {path:"view",loadChildren:()=> import("../modules/profile-view.module").then(m => m.ProfileViewModule)},
    {path:"view/storys_view",loadChildren:()=> import('../modules/storys-view.module').then(m => m.StorysViewModule)},
    {path:"view/new",component:NewStoryComponent},
    {path:"new",component:NewStoryComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorysRoutingModule { }
