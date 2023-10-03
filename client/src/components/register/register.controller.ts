import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterController {

  formDataUser: FormGroup = new FormGroup({
    name: new FormControl('Carmen', Validators.required),
    lastName: new FormControl('Fernandez', Validators.required),
    birthDay: new FormControl('1990-12-06', Validators.required),
    address: new FormControl('Corazon de maria, 18', Validators.required),
    country: new FormControl('1', Validators.required),
    postalCode: new FormControl('28038', Validators.required),
    email: new FormControl('carmen@gmail.com', [Validators.required, Validators.email]),
    phone: new FormControl<number|null>(643862337,[Validators.required,Validators.pattern(/^\d{9}$/)]),
    password: new FormControl('carmen1234', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
    confirmPassword: new FormControl('carmen1234', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
  });

  formDataPet: FormGroup = new FormGroup({
    name: new FormControl('Emma', Validators.required),
    birthDay: new FormControl('2020-15-12', Validators.required),
    gender: new FormControl('F', Validators.required),
    type: new FormControl('1', Validators.required),
    race: new FormControl('1', Validators.required),
    description: new FormControl('Mi gatita tranquila'),
    privacyPolicy: new FormControl(false, Validators.required),
    termsAndConditions: new FormControl(false, Validators.required),
  });

  formImagePet = new FormGroup({
    fileSource: new FormControl('', [Validators.required])
  });

}
