import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { AppService } from 'src/services/app.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private appservice:AppService,private registerService: RegisterService) {

  }

  sendData(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let email = this.form.get('email')?.value;
      let password = this.form.get('password')?.value;
      console.log(email);
      this.registerService.login(email, password);
    }else {
      console.log(this.form.valid)
    }
  }
}
