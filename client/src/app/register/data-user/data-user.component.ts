import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss'],
})
export class DataUserComponent {
  formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),

    description: new FormControl('', Validators.required),
  });

  constructor(private router: Router) {}

  goNext() {
    this.formGroup.markAllAsTouched();
    let password = this.formGroup.get('password')?.value;
    let confirmpassword = this.formGroup.get('confirmpassword')?.value;
    if (password === confirmpassword) {
      if (this.formGroup.valid) {
        this.router.navigateByUrl('/signup/data-pet');
      }
    } else {
      alert("Las contraseñas no coinciden")
    }
  }
}
