import { Component,Input,ViewChild,ElementRef,AfterViewInit,OnInit } from '@angular/core';
import { IStoryData } from 'src/app/interfaces/IStoryData';
import { IHttpData } from 'src/app/interfaces/IHttpData';
import { IStory } from 'src/app/interfaces/IStory';
import { ICommends } from 'src/app/interfaces/ICommends';
import { AppService } from 'src/app/app.service';
import { HomeService } from 'src/app/petgram/home/home.service';
import { httpClient } from 'src/app/httpClient';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends AppServiceEx {
  @ViewChild("container")container!:ElementRef;
  constructor(appService:AppService,private homeService:HomeService,private router:Router) {
    super(appService)
  }
  storysStyle = {'height':`${window.innerHeight}px`};

  @Input()story!:IStory;
  @Input()data!:IStoryData;
  @Input()id!:number;
  searchLikes():boolean {
    let like = this.story?.likes.find(l => l == this.getUser().user);

    if(like) {
      return true;
    }else {
      return false;
    }
  }
  like():void {
    this.socket.emit("like",this.story,this.getUser().user);
  }
  openCommends():void {
    this.router.navigate(["/petgram","profile_view",this.story.user,"storys_view","commends"],{state:{story:this.story}});
  }
  getScrollTop():number {
    let c:any = document.getElementById('home_storys');
    return c.scrollTop;
  }
  getStory() {
    return this.story;
  }
  getProfileView():void {
    this.router.navigate(["/petgram","profile_view"],{state:{user:this.getUser()}});
  }
}
