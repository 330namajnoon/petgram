import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsgComponent } from './msg/msg.component';
const routes: Routes = [{path:"msg",component:MsgComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
