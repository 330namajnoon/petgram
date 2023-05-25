import { Component } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formGroup:FormGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor(private registerService:RegisterService){}

  sendData():void {
    if(this.formGroup.get("email")?.value) {
      let email = this.formGroup.get("email")?.value;
      let password = this.formGroup.get("password")?.value;

      console.log(this.registerService.login(email,password));
    }
  }
}
