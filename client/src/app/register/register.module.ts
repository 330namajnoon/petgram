import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  declarations: [
    FirstPageComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FirstPageComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class RegisterModule { }
