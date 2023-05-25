import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterRoutes } from './register.routing';
import { DataUserComponent } from './data-user/data-user.component';
import { DataPetComponent } from './data-pet/data-pet.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    FirstPageComponent,
    LoginComponent,
    SignupComponent,
    DataUserComponent,
    DataPetComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutes,
    ReactiveFormsModule
  ],
  exports: [
    FirstPageComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class RegisterModule { }
