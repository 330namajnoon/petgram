import { AfterViewInit, Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IPet } from 'src/interfaces/IPet';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';


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

  ngOnInit(): void {

  }

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












 }















