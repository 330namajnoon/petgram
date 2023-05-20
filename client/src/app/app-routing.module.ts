import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path:"",loadChildren:()=> import("./register/register.module").then(m => m.RegisterModule)},
  {path:"petgram",loadChildren:()=> import("./petgram/petgram.module").then(m => m.PetgramModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
