import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterController } from '../register.controller';
import { RegisterService } from 'src/services/register.service';
import { IUser } from 'src/interfaces/IUser';
import { FormGroup } from '@angular/forms';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss'],
})
export class DataUserComponent extends AppServiceEx implements OnInit {
  ctrl = inject(RegisterController);
  form:FormGroup = this.ctrl.formDataUser;
  coutrys!:{id:number;country:string}[];
  constructor(private router: Router, private registerS: RegisterService,appService:AppService,private acRouter:ActivatedRoute) {
    super(appService);
  }

  goNext() {

    console.log(this.ctrl.formDataUser.value)
    this.form.markAllAsTouched();
    let password = this.form.get('password')?.value;
    let confirmPassword = this.form.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      if (this.form.valid) {
        let name:string = this.form.get("name")?.value;
        let lastName:string = this.form.get("lastName")?.value;
        let birthDay: string = this.form.get("birthDay")?.value;
        let address:string = this.form.get("address")?.value;
        let country:number = parseInt(this.form.get("country")?.value);
        let postalCode:number = parseInt(this.form.get("postalCode")?.value);
        let phone:number = parseInt(this.form.get("phone")?.value);
        let email:string = this.form.get("email")?.value;
        let password:string = this.form.get("password")?.value;
        let Language:string = this.form.get("Language")?.value;

        const newUser: IUser = {
          name,
          lastName,
          pets: [],
          id: '',
          birthDay,
          address,
          country,
          postalCode,
          phone,
          image:this.getURL(),
          email,
          password,
          Language,
          followers: [],
          following: [],
          pendingFollowers: [],
          storys: []
        }
        this.registerS.setnewUser(newUser)
        this.router.navigateByUrl('/signup/data-pet');
      } else {
        alert(this.language.getWord("missing_data_in_the_form"));
      }
    } else {
      alert(this.language.getWord("passwords_do_not_match"));
    }
  }

  ngOnInit(): void {
    this.acRouter.params.subscribe(prms => {
      this.downloadCountrys();
    })
}

  async downloadCountrys() {
    this.setLoading(true);
    let res = await this.registerS.getCoutrys();
    this.setLoading(false);
    if(!res.error) {
      this.coutrys = res.data;
    }else {
      this.router.navigate(["/error"],{state:{error:res.error}});
    }
  }

}
