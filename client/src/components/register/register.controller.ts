import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RegisterController {

  formDataUser: FormGroup = new FormGroup({
    name: new FormControl('Alba', Validators.required),
    lastName: new FormControl('Gonzalez', Validators.required),
    birthday: new FormControl('2023-10-10', Validators.required),
    address: new FormControl('Test', Validators.required),
    country: new FormControl('Test', Validators.required),
    postalCode: new FormControl('280114', Validators.required),
    email: new FormControl('test@test.com', [Validators.required, Validators.email]),
    phone: new FormControl('346512335641', Validators.required),
    password: new FormControl('123456789', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
    confirmPassword: new FormControl('123456789', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
  });

  formDataPet: FormGroup = new FormGroup({
    name: new FormControl('max', Validators.required),
    birthday: new FormControl('2023-10-10', Validators.required),
    gender: new FormControl('M', Validators.required),
    type: new FormControl('1', Validators.required),
    race: new FormControl('1', Validators.required),
    description: new FormControl('negro'),
    privacyPolicy: new FormControl(true, Validators.required),
    termsAndConditions: new FormControl(true, Validators.required),
  });

  formImagePet = new FormGroup({
    fileSource: new FormControl('', [Validators.required])
  });

}
