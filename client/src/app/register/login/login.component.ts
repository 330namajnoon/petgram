import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private registerService: RegisterService) {}

  sendData(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      let email = this.formGroup.get('email')?.value;
      let password = this.formGroup.get('password')?.value;

      console.log(this.registerService.login(email, password));
    }
  }
}
