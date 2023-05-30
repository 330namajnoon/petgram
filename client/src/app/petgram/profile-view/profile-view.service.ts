import { IFollower } from './../../interfaces/IFollower';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/interfaces/IUserData';
import { AppService } from 'src/app/app.service';
import { HomeService } from '../home/home.service';
import { httpClient } from 'src/app/httpClient';
import { IStory } from 'src/app/interfaces/IStory';
import { ICommends } from 'src/app/interfaces/ICommends';
@Injectable({
  providedIn: 'root'
})
export class ProfileViewService {
  private profileData!:IUserData;
  private galleryMenuSelected:string = "Todos Publicaciones";
  private storys:IStory[] = [];
  constructor(private appService:AppService,private homeService:HomeService) {



  }

  downloadProfileData(user:string):void {
    const _this = this;
    httpClient("POST",this.appService.getURL()+"/profileData",[{name:"user",value:user}],(data,loaded)=> {
      if(loaded == 100) {
        let profileData = JSON.parse(data);
        console.log(profileData.profileImage)
        profileData.profileImage = `${this.appService.getURL()}/${profileData.user}/DCIM/${profileData.profileImage}`;
        profileData.followers = profileData.followers.map((f:IFollower) => {
          let _f:IFollower = f;
          _f.image = `${this.appService.getURL()}/${f.user}/DCIM/${f.image}`
          return _f;
        })
        this.profileData = profileData;
        console.log(this.storys);

      }
    })
  }

  setGalleryMenuSelected(name:string):void {
    this.galleryMenuSelected = name;
  }

  getProfileData():IUserData {
    return this.profileData;
  }

  getGalleryMenuSelected():string {
    return this.galleryMenuSelected;
  }

}
