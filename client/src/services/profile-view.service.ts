import { IFollower } from 'src/interfaces/IFollower';
import { Injectable } from '@angular/core';
import { IUserData } from 'src/interfaces/IUserData';
import { AppService } from './app.service';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
import { IStory } from 'src/interfaces/IStory';
import { IComment } from 'src/interfaces/IComment';
import { IStoryAdress } from 'src/interfaces/IStoryAdress';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IView } from 'src/interfaces/IView';
import { ILike } from 'src/interfaces/ILike';
import { IStoryLink } from 'src/interfaces/IStoryLink';
import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileViewService extends AppServiceEx {
  private profileViewUrl:string[] = [];
  private profileData: IUserData | undefined;
  private galleryMenuSelected: string = this.language.getWord('all_storys');
  private storys: IStory[] = [];
  constructor(private http: HttpClient, appService: AppService, private homeService: HomeService,private router:Router) {
    super(appService);
  }

  downloadProfileData(user: string):Promise<IHTTPResponse<IUserData>> {
    return new Promise((resolve)=> {
      const _this = this;
      this.profileData = undefined
      if (user) {
        _this.http.post<IHTTPResponse<IUserData>>(this.getURL() + "/profileData", { user }).subscribe((resp) => {
          if(!resp.error) {
            let profileData = resp.data;
            profileData.followers = profileData.followers.map((f: IFollower) => {
              let _f: IFollower = f;
              return _f;
            })
            this.profileData = profileData;
            this.storys = new Array(this.profileData.storys.length);
            this.downloadStorys(this.profileData.id, this.profileData.storys)
            resolve(resp);
          }else {
            _this.router.navigate(["/error"],{state:{error:resp.error}});
          }

        })

      }
    })
  }


  downloadStorys(user_id: string, storysAdres: IStoryAdress[]) {
    const _this = this;
    const url: string = this.getURL();
    async function download(index: number) {
      let storyLink:IStoryLink = {
        user_id,
        id:storysAdres[index].story_id,
        pet_id:storysAdres[index].pet_id
      }
      _this.http.post<IHTTPResponse<IStory>>(`${url}/downloadStory`,storyLink).subscribe((resp)=> {
        if(!resp.error) {
          const story: IStory = resp.data;
          _this.socket.on("comment" + story?.id, (comment) => {
            story.comments.push(comment);
          })
          _this.socket.emit("view",story.id,_this.getUser().id);
          _this.socket.on("view" + story?.id, (view) => {
            story?.views.push(view as IView);
          })
          _this.socket.on("like" + story?.id, (like) => {
            story?.likes.push(like as ILike);
          })
          _this.storys[index] = story;

        }else {
          _this.router.navigate(["/error"],{state:{error:resp.error}});
        }
      });
    }
    for (let index = 0; index < storysAdres.length; index++) {
      download(index);
    }
  }

  setProfileViewUrl(values:string[]):void {
    this.profileViewUrl = values;
  }
  getProfileViewUrl():string[] {
    return this.profileViewUrl;
  }

  getStoryById(id: string): IStory | undefined {
    let story: IStory | undefined;
    this.storys.forEach(s => {
      if (s.id == id) story = s;
    })
    return story;
  }
  getStorysByPetName(name: string): IStory[] {
    let storys: IStory[] = [];
    this.storys.forEach(s => {
      if (s.pet == name) storys.push(s);
    })
    return storys;
  }
  getStorys(): IStory[] {
    return this.storys;
  }

  setGalleryMenuSelected(name: string): void {
    this.galleryMenuSelected = name;
  }

  getProfileData(): IUserData {
    return this.profileData!;
  }

  getGalleryMenuSelected(): string {
    return this.galleryMenuSelected;
  }

  getRace(race:number):Promise<IHTTPResponse<string>> {
    return new Promise((resolve)=> {
      this.http.get<IHTTPResponse<string>>(`${this.getURL()}/getRace?id=${race}`).subscribe(res => {
        resolve(res);
      })
    })
  }



}
