import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorysViewComponent } from './storys-view/storys-view.component';
const routes: Routes = [
  {path:"",component:StorysViewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorysViewRoutingModule { }
