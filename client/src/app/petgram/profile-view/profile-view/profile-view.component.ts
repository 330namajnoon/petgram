import { Component } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { AppService } from 'src/app/app.service';
import { IUserData } from 'src/app/interfaces/IUserData';
import { ProfileViewService } from '../profile-view.service';
import { IStoryAdress } from 'src/app/interfaces/IStoryAdress';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {

  constructor(private profileService:ProfileViewService,private acRoute:ActivatedRoute,private homeService:HomeService,private appService:AppService) {
    this.acRoute.params.subscribe(pr => {
      let user:string = pr["id"];
      this.profileService.downloadProfileData(user);
    })
  }

  getProfileData():IUserData {

    return this.profileService.getProfileData();
  }
  getdevice():string {
    return this.appService.getDevice();
  }

  storysFilter(pet:string):IStoryAdress[] {
    let storys:IStoryAdress[] = [];
    this.getProfileData().storys.forEach(s => {
      if(s.pet == pet) storys.push(s);
    })
    return storys
  }
}
