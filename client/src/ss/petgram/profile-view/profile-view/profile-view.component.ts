import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
export class ProfileViewComponent extends AppServiceEx implements OnInit {
  constructor(private profileService:ProfileViewService,private acRoute:ActivatedRoute,private router:Router,private homeService:HomeService,appService:AppService) {
    super(appService)
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {

        let state = router.getCurrentNavigation()?.extras.state;
        if(state) {
          let data = state as {user:string};
          this.profileService.downloadProfileData(data.user);

        }
      }
    })
  }

  ngOnInit(): void {

  }

  getMyProfile():boolean {
    if(this.getProfileData().user == this.getUser().user) {
      return false;
    }else {
      return true;
    }
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
