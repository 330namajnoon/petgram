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
  formGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private appservice:AppService,private registerService: RegisterService) {

  }

  sendData(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.valid) {
      let email = this.formGroup.get('email')?.value;
      let password = this.formGroup.get('password')?.value;

      console.log(this.registerService.login(email, password));
    }
    httpClient("POST",this.appservice.getURL()+"/login",[{value:"sina",name:"user"},{name:"password",value:"1234"}],(data,loaded)=> {
      console.log(loaded,JSON.parse(data))
    })
  }
}
