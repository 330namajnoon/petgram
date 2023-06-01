import { Component } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { AppService } from 'src/app/app.service';
import { IUserData } from 'src/app/interfaces/IUserData';
import { ProfileViewService } from '../profile-view.service';
import { IStoryAdress } from 'src/app/interfaces/IStoryAdress';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';
import { IFollower } from 'src/app/interfaces/IFollower';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent extends AppServiceEx {

  constructor(private profileService:ProfileViewService,private acRoute:ActivatedRoute,private homeService:HomeService,appService:AppService) {
    super(appService)
    this.acRoute.params.subscribe(pr => {
      let user:string = pr["id"];
      this.profileService.downloadProfileData(user);
    })
  }

  getProfileData():IUserData {

    return this.profileService.getProfileData();
  }


  storysFilter(pet:string):IStoryAdress[] {
    let storys:IStoryAdress[] = [];
    this.getProfileData().storys.forEach(s => {
      if(s.pet == pet) storys.push(s);
    })
    return storys
  }

  pendingFollowersSearch():boolean {
    let follower:IFollower|undefined = this.profileService.getProfileData().pendingFollowers.find(f => f.user == this.getUser().user);
    if(follower) {
      return true;
    }else {
      return false
    }
  }

  followersSearch():boolean {
    let follower:IFollower|undefined = this.profileService.getProfileData().followers.find(f => f.user == this.getUser().user);
    if(follower) {
      return true;
    }else {
      return false
    }
  }

  follow():void {
    let {profileImage,user,userName} = this.getUser();
    let follower:IFollower = {
      image:profileImage,
      user,
      userName
    }
    this.profileService.getProfileData().pendingFollowers.push(follower);
  }
}
