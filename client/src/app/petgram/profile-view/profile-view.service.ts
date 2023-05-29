import { IFollower } from './../../interfaces/IFollower';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/interfaces/IUserData';
import { AppService } from 'src/app/app.service';
import { HomeService } from '../home/home.service';
import { httpClient } from 'src/app/httpClient';

@Injectable({
  providedIn: 'root'
})
export class ProfileViewService {
  private profileData!:IUserData;
  private galleryMenuSelected:string = "Todos Publicaciones";
  constructor(private appService:AppService,private homeService:HomeService) {



  }

  downloadProfileData(user:string):void {
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
        console.log(this.profileData);
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
