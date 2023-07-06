import { AfterViewInit, Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IPet } from 'src/interfaces/IPet';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent extends AppServiceEx implements AfterViewInit,OnInit  {
  petData!:IPet;
  petSelected:number = 0;
  user!:IUser;
  constructor(appService: AppService , private proConfig: ProfileConfigService,private router:Router){
    super(appService)


  }

  petForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('', [Validators.required, Validators.min(2)]),
    race: new FormControl<number>(1, [Validators.required]),
    gender: new FormControl('',[Validators.required])
  })

  userForm = new FormGroup({
    id: new FormControl('',[Validators.email]),
    email: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    image: new FormControl(''),
    age: new FormControl(18),
    address: new FormControl(''),
    country: new FormControl(),
    postalCode: new FormControl(0),
    phone: new FormControl(0),
    languages: new FormControl(""),
    pets: new FormControl([]),
    password: new FormControl(''),


  })



  ngAfterViewInit(): void {
    let timer_:any;
    let _this = this;
    function timer() {
      if(!_this.getUser()) {
        return
      }else {
        _this.setPetData(_this.getUser().pets[_this.petSelected]);
        if(timer_)clearInterval(timer_);
      }
    }
    timer_ = setInterval(timer,500);
  }

  setPetData(pet:IPet) {
    this.petData = pet;
  }

  getPetData():IPet {
    return this.petData;
  }






 getEachPet(selectOption: string): void {
   this.selectedPet =  this.getUser().pets.find(p => p.name === selectOption);
   console.log(this.selectedPet);

  }

  changePetInfo() {
    let pet : IPet = {
      id: this.petForm.get("id")?.value || "",
      user_id: this.petForm.get('user_id')?.value || "",
      name: this.petForm.get("name")?.value || "",
      birthDay: this.petForm.get('birthday')?.value || "",
      type: this.petForm.get("type")?.value || 1,
      race: this.petForm.get("race")?.value || 1,
      gender: this.petForm.get("gender")?.value || "",
      description: this.petForm.get("description")?.value || ""
    }
  }









}















