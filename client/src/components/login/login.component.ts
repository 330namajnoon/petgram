import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { Router } from '@angular/router';
import { RegisterController } from '../register/register.controller';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AppServiceEx implements OnInit {
  ctrl = inject(RegisterController);
  error:boolean = false;
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(private appservice:AppService,private registerService: RegisterService,private router:Router) {
    super(appservice);
  }

  ngOnInit(): void {
    this.ctrl.formDataPet.reset();
    this.ctrl.formDataUser.reset();
    this.ctrl.formImagePet.reset();
  }

  async sendData() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let email = this.form.get('email')?.value;
      let password = this.form.get('password')?.value;
      let res = await this.registerService.login(email,password);
        if(!res.error) {
          this.setUser(res.data);
          localStorage.setItem("user",JSON.stringify({email:res.data.email,password:res.data.password}));
          this.router.navigate(["/petgram"]);
        }else {
          this.error = true;
        }
      this.registerService.login(email, password);
    }else {
      console.log(this.form.valid)
    }
  }
}
