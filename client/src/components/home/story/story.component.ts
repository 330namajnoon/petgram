import { Component,Input,ViewChild,ElementRef,AfterViewInit,OnInit } from '@angular/core';
import { IStoryData } from 'src/interfaces/IStoryData';
import { IStory } from 'src/interfaces/IStory';
import { ICommends } from 'src/interfaces/ICommends';
import { AppService } from 'src/services/app.service';
import { HomeService } from 'src/services/home.service';
import { httpClient } from 'src/assets/ts/httpClient';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends AppServiceEx implements AfterViewInit,OnInit {
  @ViewChild("container")container!:ElementRef;
  constructor(appService:AppService,private homeService:HomeService,private router:Router) {
    super(appService)
  }
  storysStyle = {'height':`${window.innerHeight-80}px`};
  story:IStory|undefined;
  commends:ICommends[] = [];
  @Input()data!:IStoryData;
  @Input()id!:number;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    this.homeService.set(`story${this.id}`,this);
    let container:HTMLElement = this.container.nativeElement;
    container.addEventListener("touchstart",(e:TouchEvent)=> {
      let y1 = e.touches[0].pageY;
      container.addEventListener("touchend",(ee:TouchEvent)=> {
        let y2 = ee.changedTouches[0].pageY;
        let next = y2-y1 < 0 ? this.id + 1 : this.id - 1 ;
        if(y2-y1 !== 0)this.homeService.get(`story${next}`).downloadStory();
      })
    })
    if(this.id == 0) this.downloadStory();
  }
  searchLikes():boolean {
    let like = this.story?.likes.find(l => l == this.getUser().email);

    if(like) {
      return true;
    }else {
      return false;
    }
  }
  like():void {
    this.socket.emit("like",this.story,this.getUser().email);
  }
  downloadStory():void {
    let _this = this;
    if(!this.story) {
      httpClient<{story:IStory,commends:ICommends[]}>("POST",this.getURL()+"/downloadStory",[{name:"storyId",value:this.data.id},{name:"user",value:this.data.email}],(data,loaded)=> {
        let story:IStory = data.story;
        let commends:ICommends[] = data.commends;
        story.url = `${this.getURL()}/${_this.data.email}/DCIM/${story.url}`;
        story.profileImage = `${this.getURL()}/${_this.data.email}/DCIM/${story.profileImage}`;
        let m = story.type == "png" || story.type == "jpg" ? new Image() : document.createElement("video");
        m.src = story.url;
        m.addEventListener("load",()=> {
          _this.story = story;
          _this.commends = commends;

          this.socket.on("commend"+_this.story?.id,(commend)=> {
            _this.commends.push(commend);
          })
          this.socket.emit("view",this.story,this.getUser().email);
          this.socket.on("view"+this.story?.id,(user)=> {
            this.story?.view.push(user);
          })
          this.socket.on("like"+this.story?.id,(user)=> {
            this.story?.likes.push(user);
          })

        })
      })
    }
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


  getProfileView():void {
    let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
    url[0] = "/"+url[0];
    url.push("profile_view");
    this.router.navigate(url,{state:{user:this.story?.user}});

  }
}
