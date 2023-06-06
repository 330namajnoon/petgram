import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { interval } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';
import { FormGroup,FormControl } from '@angular/forms';
import { IStory } from 'src/app/interfaces/IStory';
import { ProfileViewService } from '../../profile-view/profile-view.service';
@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.scss']
})
export class NewStoryComponent extends AppServiceEx {
  @ViewChild("video")video!:ElementRef;
  @ViewChild("select")select!:ElementRef;
  @ViewChild("textArea")textArea!:ElementRef;
  private file!:File;
  fileUrl!:string;
  fileType!:string;
  videoStatus:boolean = false;
  loaded:number = 0;
  loadingDisplay:boolean = true;
  newStory!:IStory;
  constructor(private profileS:ProfileViewService ,appService:AppService,private router:Router) {

    super(appService);
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        let state = router.getCurrentNavigation()?.extras.state;
        if(state) {
          let data = state as {file:File};
          this.file = data.file;
          this.fileLoader(this.file);
        }
      }
    })
  }

  fileLoader(file:File):void {
    const fileReader:FileReader = new FileReader();
    fileReader.addEventListener("progress",({total,loaded})=> {
      let _loaded:any = ((100/total)*loaded).toFixed(0);
      this.setLoaded(_loaded);
      console.log(_loaded);

    })
    fileReader.addEventListener("load",()=> {
      if(typeof fileReader.result == "string") {
        this.fileType = file.type.split("/")[1];
        this.fileUrl = fileReader.result;
        if(this.fileType == "mp4") {
          const v:HTMLVideoElement = document.createElement("video");
          v.src = fileReader.result;
          v.addEventListener("loadedmetadata",()=> {
            this.loadingDisplay = false;
            this.videoPlay_pause();
          })
        }else {
          const img:HTMLImageElement = document.createElement("img");
          img.src = fileReader.result;
          img.addEventListener("load",()=> {
            this.loadingDisplay = false;
          })
        }
      }
    })
    fileReader.readAsDataURL(file);
  }


  setStory():void {
    let {user,userName,profileImage} = this.getUser();
    let selectE = this.select.nativeElement as HTMLInputElement;
    let textArea = this.textArea.nativeElement as HTMLTextAreaElement;
    let newID:string = this.createNewID(this.profileS.getStorys(),10);
    let newStory:IStory = {
      likes:[],
      pet:selectE.value,
      type:this.fileType,
      url:newID+"."+this.file.name.split(".")[1],
      view:[],
      userName,
      profileImage,
      commends:[],
      user,
      description:textArea.value,
      id:newID,
    }
    this.newStory = newStory;
    newStory.url = this.fileUrl;
    newStory.profileImage = `${this.getURL()}/${user}/DCIM/${newStory.profileImage}`;
    console.log(newStory);
    let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
    url[0] = "/"+url[0];
    // url = url.slice(0,-1);
    url.push("story");
    this.router.navigate(url,{state:{storys:[newStory],index:0}});
  }

  getFileURL():string {
    return this.fileUrl;
  }

  getFileType():string {
    return this.fileType;
  }

  setVideoTime(time:number):void {
    let video = this.video.nativeElement as HTMLVideoElement;
    video.currentTime = time;
  }
  videoTime() {
    let video = document.getElementById("newVideo") as HTMLVideoElement;
    if(video.duration - video.currentTime <= 1) {
      video.pause();
      video.currentTime = 0;
      video.play();
    }
  }


  videoPlay_pause():void {
    let t:any = "";
    if(this.videoStatus == false) {
      this.video.nativeElement.play();
      this.videoStatus = true;
      t = setInterval(this.videoTime,1000);
    }else {
      this.video.nativeElement.pause();
      this.videoStatus = false;
      clearInterval(t);
    }
  }
  setLoaded(n:number):void {
    this.loaded = n;
  }
  getLoaded():number {
    return this.loaded;
  }

}
