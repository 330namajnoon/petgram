import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPageComponent } from '../components/first-page/first-page.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { RegisterRoutes } from '../routers/register.routing';
import { DataUserComponent } from '../components/data-user/data-user.component';
import { DataPetComponent } from '../components/data-pet/data-pet.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ValidatorComponent } from '../components/validator/validator.component';
import { PasswordValidatorComponent } from '../components/password-validator/password-validator.component';
import { ImagePetComponent } from 'src/components/image-pet/image-pet.component';

@NgModule({
  declarations: [
    FirstPageComponent,
    LoginComponent,
    SignupComponent,
    DataUserComponent,
    DataPetComponent,
    ValidatorComponent,
    PasswordValidatorComponent,
    ImagePetComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutes,
    ReactiveFormsModule,
  ],
  exports: [
    FirstPageComponent,
    LoginComponent,
    SignupComponent
  ]
})
export class RegisterModule { }
