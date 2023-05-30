import { IFollower } from './../../interfaces/IFollower';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/interfaces/IUserData';
import { AppService } from 'src/app/app.service';
import { HomeService } from '../home/home.service';
import { httpClient } from 'src/app/httpClient';
import { IStory } from 'src/app/interfaces/IStory';
import { ICommends } from 'src/app/interfaces/ICommends';
import { IStoryAdress } from 'src/app/interfaces/IStoryAdress';
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
        this.storys = new Array(this.profileData.storys.length);
        this.downloadStorys(this.profileData.user,this.profileData.storys)
      }
    })
  }

  async downloadStorys(user:string,storysAdres:IStoryAdress[]) {
    const _this = this;
    const url:string = this.appService.getURL();
    async function download(index:number) {
      let data = await httpClient("POST",`${url}/downloadStory`,[{name:"user",value:user},{name:"storyId",value:storysAdres[index].story}],(data,loaded)=> {});
      const story:IStory = JSON.parse(data).story;
      story.url = `${url}/${user}/DCIM/${story.url}`;
      story.commends =  JSON.parse(data).commends;
      _this.storys[index] = story;
    }
    for (let index = 0; index < storysAdres.length; index++) {
      download(index);
    }
  }

  getStoryById(id:string):IStory|undefined {
    let story:IStory|undefined;
    this.storys.forEach(s => {
      if(s.id == id) story = s;
    })
    return story;
  }

  getStorys():IStory[] {
    return this.storys;
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
