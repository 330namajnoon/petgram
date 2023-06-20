import { Component,Input,ViewChild,ElementRef,AfterViewInit,OnInit } from '@angular/core';
import { IStoryData } from 'src/ss/interfaces/IStoryData';
import { IStory } from 'src/interfaces/IStory';
import { AppService } from 'src/services/app.service';
import { HomeService } from 'src/services/home.service';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { ProfileViewService } from 'src/services/profile-view.service';
import { StorysViewService } from 'src/services/storys-view.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends AppServiceEx {
  @ViewChild("container")container!:ElementRef;
  constructor(appService:AppService,private homeService:HomeService,private router:Router,private prS:ProfileViewService,public storysVS:StorysViewService) {
    super(appService)
  }
  storysStyle = {height:`${window.innerHeight}px`};

  @Input()story!:IStory;
  @Input()data!:IStoryData;
  @Input()id!:number;
  searchLikes():boolean {
    let like = this.story?.likes.find(l => l.user_id == this.getUser().id);

    if(like) {
      return true;
    }else {
      return false;
    }
  }
  like():void {
    this.socket.emit("like",this.story,this.getUser().id);
  }
  openCommends():void {
    this.router.navigate(["/petgram","profile_view",this.story.id,"storys_view","commends"],{state:{story:this.story}});
  }
  getScrollTop():number {
    let c:any = document.getElementById('home_storys');
    return c.scrollTop;
  }
  getStory() {
    return this.story;
  }
  getProfileView():void {
    this.storysVS.getVideoPlayerControl()();
    let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
    url[0] = "/" + url[0];
    url = url.slice(0,-1);
    let urls:string[] = this.prS.getProfileViewUrl();
    this.router.navigate(url, { state: { user:urls[urls.length-1]} });
  }
}
