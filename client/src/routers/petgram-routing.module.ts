import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from 'src/components/menu/menu.component';
// import { StorysComponent } from '../ss/petgram/storys/storys/storys.component';


const routes: Routes = [
  {path:"",component:MenuComponent,outlet:"menu"},
  {path:"",loadChildren:()=> import("../modules/home.module").then(m => m.HomeModule)},
  // {path:"home",loadChildren:()=> import("../ss/petgram/home/home.module").then(m => m.HomeModule)},
  // {path:"storys",loadChildren:()=> import("../ss/petgram/storys/storys.module").then(m => m.StorysModule)},
  {path:"settings",loadChildren:()=> import("../modules/profile-config.module").then(m => m.ProfileConfigModule)},
  // {path:"friends",loadChildren:()=> import("../ss/petgram/friends/friends.module").then(m => m.FriendsModule)},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetgramRoutingModule {

}
