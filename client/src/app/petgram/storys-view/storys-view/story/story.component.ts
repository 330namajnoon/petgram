import { Component,Input,ViewChild,ElementRef,AfterViewInit,OnInit } from '@angular/core';
import { IStoryData } from 'src/app/interfaces/IStoryData';
import { IHttpData } from 'src/app/interfaces/IHttpData';
import { IStory } from 'src/app/interfaces/IStory';
import { ICommends } from 'src/app/interfaces/ICommends';
import { AppService } from 'src/app/app.service';
import { HomeService } from 'src/app/petgram/home/home.service';
import { httpClient } from 'src/app/httpClient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements AfterViewInit,OnInit {
  @ViewChild("container")container!:ElementRef;
  constructor(private appService:AppService,private homeService:HomeService,private router:Router) {}
  device:string = this.appService.getDevice();
  storysStyle = {'height':`${window.innerHeight}px`};
  commends:ICommends[] = [];
  @Input()story!:IStory;
  @Input()data!:IStoryData;
  @Input()id!:number;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    // this.homeService.set(`story${this.id}`,this);
    // let container:HTMLElement = this.container.nativeElement;
    // container.addEventListener("touchstart",(e:TouchEvent)=> {
    //   let y1 = e.touches[0].pageY;
    //   container.addEventListener("touchend",(ee:TouchEvent)=> {
    //     let y2 = ee.changedTouches[0].pageY;
    //     let next = y2-y1 < 0 ? this.id + 1 : this.id - 1 ;
    //     if(y2-y1 !== 0)this.homeService.get(`story${next}`).downloadStory();
    //   })
    // })
    // if(this.id == 0) this.downloadStory();
  }
  searchLikes():boolean {
    let like = this.story?.likes.find(l => l == this.appService.getUser().user);

    if(like) {
      return true;
    }else {
      return false;
    }
  }
  like():void {
    this.appService.socket.emit("like",this.story,this.appService.getUser().user);
  }
  downloadStory():void {
    let _this = this;
    if(!this.story) {
      httpClient("POST",this.appService.getURL()+"/downloadStory",[{name:"storyId",value:this.data.id},{name:"user",value:this.data.user}],(data,loaded)=> {
        let story:IStory = JSON.parse(data).story;
        let commends:ICommends[] = JSON.parse(data).commends;
        story.url = `${this.appService.getURL()}/${_this.data.user}/DCIM/${story.url}`;
        story.profileImage = `${this.appService.getURL()}/${_this.data.user}/DCIM/${story.profileImage}`;
        let m = story.type == "png" || story.type == "jpg" ? new Image() : document.createElement("video");
        m.src = story.url;
        m.addEventListener("load",()=> {
          _this.story = story;
          _this.commends = commends;

          this.appService.socket.on("commend"+_this.story?.id,(commend)=> {
            _this.commends.push(commend);
          })
          this.appService.socket.emit("view",this.story,this.appService.getUser().user);
          this.appService.socket.on("view"+this.story?.id,(user)=> {
            this.story?.view.push(user);
          })
          this.appService.socket.on("like"+this.story?.id,(user)=> {
            this.story?.likes.push(user);
          })

        })
      })
    }
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
  getCommends() {
    return this.commends;
  }
  getDevice(): string {
      return this.appService.getDevice();
  }
  getUser():any {
    return this.story?.user
  }
  getProfileView():void {
    this.router.navigate(["/petgram","profile_view"],{state:{user:this.getUser()}});
  }
}
