import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterController {

  formDataUser: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    postalCode: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl("",[Validators.min(9)]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
  });

  formDataPet: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    race: new FormControl('', Validators.required),
    description: new FormControl(''),
    privacyPolicy: new FormControl(false, Validators.required),
    termsAndConditions: new FormControl(false, Validators.required),
  });

  formImagePet = new FormGroup({
    fileSource: new FormControl('', [Validators.required])
  });

}
