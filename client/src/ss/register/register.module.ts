import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterRoutes } from './register.routing';
import { DataUserComponent } from './data-user/data-user.component';
import { DataPetComponent } from './data-pet/data-pet.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ValidatorComponent } from './components/validator/validator.component';
import { PasswordValidatorComponent } from './components/password-validator/password-validator.component';
import { ImagePetComponent } from './image-pet/image-pet.component';


@NgModule({
  declarations: [
    FirstPageComponent,
    LoginComponent,
    ImagePetComponent,
    DataUserComponent,
    DataPetComponent,
    ValidatorComponent,
    PasswordValidatorComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutes,
    ReactiveFormsModule,
  ],
  exports: [
    FirstPageComponent,
    LoginComponent,
    ImagePetComponent
  ]
})
export class RegisterModule { }
