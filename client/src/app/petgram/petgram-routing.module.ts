import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { StorysComponent } from './storys/storys/storys.component';
StorysComponent
const routes: Routes = [
  {path:"",component:MenuComponent,outlet:"menu"},
  // {path:"home/comments/:id",component:CommentsComponent,outlet:"comments"},
  {path:"",loadChildren:()=> import("./home/home.module").then(m => m.HomeModule)},
  {path:"home",loadChildren:()=> import("./home/home.module").then(m => m.HomeModule)},
  {path:"storys",loadChildren:()=> import("./storys/storys.module").then(m => m.StorysModule)},
  {path:"settings",loadChildren:()=> import("./settings/settings.module").then(m => m.SettingsModule)},
  {path:"friends",loadChildren:()=> import("./friends/friends.module").then(m => m.FriendsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetgramRoutingModule { }
