import { IFollower } from './../../interfaces/IFollower';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/app/interfaces/IUserData';
import { AppService } from 'src/app/app.service';
import { HomeService } from '../home/home.service';
import { httpClient } from 'src/app/httpClient';
import { IStory } from 'src/app/interfaces/IStory';
import { ICommends } from 'src/app/interfaces/ICommends';
import { IStoryAdress } from 'src/app/interfaces/IStoryAdress';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';
@Injectable({
  providedIn: 'root'
})
export class ProfileViewService extends AppServiceEx {
  private profileData!:IUserData;
  private galleryMenuSelected:string = this.language.getWord('all_storys');
  private storys:IStory[] = [];
  constructor(appService:AppService,private homeService:HomeService) {
    super(appService);
  }

  downloadProfileData(user:string):void {
    const _this = this;
    if(user) {
      httpClient<IUserData>("POST",this.getURL()+"/profileData",[{name:"user",value:user}],(data,loaded)=> {
        if(loaded == 100) {
          let profileData = data;
          profileData.profileImage = `${this.getURL()}/${profileData.user}/DCIM/${profileData.profileImage}`;
          profileData.followers = profileData.followers.map((f:IFollower) => {
            let _f:IFollower = f;
            _f.image = `${this.getURL()}/${f.user}/DCIM/${f.image}`
            return _f;
          })
          this.profileData = profileData;
          this.storys = new Array(this.profileData.storys.length);
          this.downloadStorys(this.profileData.user,this.profileData.storys)
        }
      })
    }
  }

  async downloadStorys(user:string,storysAdres:IStoryAdress[]) {
    const _this = this;
    const url:string = this.getURL();
    async function download(index:number) {
      let data = await httpClient("POST",`${url}/downloadStory`,[{name:"user",value:user},{name:"storyId",value:storysAdres[index].story}],(data,loaded)=> {});
      const story:IStory = JSON.parse(data).story;
      story.url = `${url}/${user}/DCIM/${story.url}`;
      story.profileImage = `${url}/${user}/DCIM/${story.profileImage}`;
      story.commends =  JSON.parse(data).commends;
      _this.socket.on("commend"+story.id,(commend)=> {
        story.commends.push(commend);
      })
      _this.socket.emit("view",story,_this.getUser().user);
      _this.socket.on("view"+story?.id,(user)=> {
        story?.view.push(user);
      })
      _this.socket.on("like"+story?.id,(user)=> {
        story?.likes.push(user);
      })
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
  getStorysByPetName(name:string):IStory[] {
    let storys:IStory[] = [];
    this.storys.forEach(s => {
      if(s.pet == name) storys.push(s);
    })
    return storys;
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

  addNewStory(story:IStory):void {
    this.storys.unshift(story);
  }

}
