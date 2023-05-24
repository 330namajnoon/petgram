import { Component,Input,ViewChild,ElementRef,AfterViewInit,OnInit } from '@angular/core';
import { IStoryData } from 'src/app/interfaces/IStoryData';
import { IHttpData } from 'src/app/interfaces/IHttpData';
import { IStory } from 'src/app/interfaces/IStory';
import { IComments } from 'src/app/interfaces/ICommends';
import { AppService } from 'src/app/app.service';
import { HomeService } from '../home.service';
import { httpClient } from 'src/app/httpClient';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements AfterViewInit,OnInit {
  @ViewChild("container")container!:ElementRef;
  constructor(private appService:AppService,private homeService:HomeService) {}
  device:string = this.appService.getDevice();
  storysStyle = {'height':`${window.innerHeight-80}px`};
  story:IStory|undefined;
  comments:IComments[] = [];
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
        let distancia = y2-y1;

        this.homeService.get("setScroll")(this.id,distancia);
      })
    })
    if(this.id == 0) this.downloadStory();
  }
  searchLikes():boolean {
    let like = this.story?.likes.find(l => l == this.data.user);

    if(like) {
      return true;
    }else {
      return false;
    }
  }
  downloadStory():void {
    let _this = this;
    if(!this.story) {
      httpClient("POST",this.appService.getURL()+"/downloadStory",[{name:"storyId",value:this.data.id},{name:"user",value:this.data.user}],(data,loaded)=> {
        let _data:IStory = JSON.parse(data);
        _data.url = `${this.appService.getURL()}/${_this.data.user}/DCIM/${_data.url}`;
        _data.profileImage = `${this.appService.getURL()}/${_this.data.user}/DCIM/${_data.profileImage}`;
        let m = _data.type == "png" || _data.type == "jpg" ? new Image() : document.createElement("video");
        m.src = _data.url;
        m.addEventListener("load",()=> {
          httpClient("POST",this.appService.getURL()+"/downloadComments",[{name:"storyId",value:_this.data.id},{name:"user",value:_this.data.user}],(data,loaded)=> {
            let comments:IComments[] = JSON.parse(data);
            _this.comments = comments;
            _this.story = _data;
            this.appService.socket.on("commend"+_this.story?.id,(commend)=> {
              _this.comments.push(commend);
            })
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
    return this.comments;
  }
  getDevice(): string {
      return this.appService.getDevice();
  }
}
