import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../register.service';
import { httpClient } from 'src/app/httpClient';
import { AppService } from 'src/app/app.service';
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
      Validators.minLength(8),
    ]),
  });

  constructor(private appservice:AppService,private registerService: RegisterService) {

  }

<<<<<<< HEAD:client/src/app/register/login/login.component.ts
  sendData(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let email = this.form.get('email')?.value;
      let password = this.form.get('password')?.value;

      console.log(this.registerService.login(email, password));
=======

>>>>>>> origin/majnoonSQL:client/src/ss/register/login/login.component.ts
    }
    httpClient("POST",this.appservice.getURL()+"/login",[{value:"sina",name:"user"},{name:"password",value:"1234"}],(data,loaded)=> {
      console.log(loaded,JSON.parse(data))
    })
  }
}
