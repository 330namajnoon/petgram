import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsgComponent } from './msg/msg.component';
import { FirstPageComponent } from './register/first-page/first-page.component';
import { LoginComponent } from './register/login/login.component';
import { SignupComponent } from './register/signup/signup.component';
const routes: Routes = [
  {path:"msg",component:MsgComponent},
  {path:"",component:FirstPageComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
