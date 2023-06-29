import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPageComponent } from '../components/first-page/first-page.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterRoutes } from '../routers/register.routing';
import { ReactiveFormsModule } from "@angular/forms";
import { ValidatorComponent } from '../components/validator/validator.component';
import { PasswordValidatorComponent } from '../components/password-validator/password-validator.component';
import { ImagePetComponent } from 'src/components/register/image-pet/image-pet.component';
import { DataPetComponent } from 'src/components/register/data-pet/data-pet.component';
import { DataUserComponent } from 'src/components/register/data-user/data-user.component';

@NgModule({
  declarations: [
    FirstPageComponent,
    LoginComponent,
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
    ValidatorComponent
  ]
})
export class RegisterModule { }
