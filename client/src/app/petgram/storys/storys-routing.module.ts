import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorysComponent } from './storys/storys.component';
const routes: Routes = [
  {path:"",component:StorysComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorysRoutingModule { }
