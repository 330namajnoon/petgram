import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.scss']
})
export class NewStoryComponent extends AppServiceEx {
  private file!:File;
  fileUrl!:string;
  fileType!:string;
  videoStatus:boolean = false;
  @ViewChild("video")video!:ElementRef;
  constructor(appService:AppService,private router:Router) {
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
      console.log(_loaded);

    })
    fileReader.addEventListener("load",()=> {
      if(typeof fileReader.result == "string") {
        this.fileType = file.type.split("/")[1];
        this.fileUrl = fileReader.result;
        setTimeout(()=> {
          this.videoPlay_pause();
          console.log((this.video.nativeElement as Object).constructor.name )
          this.videoTime((currentTime,duration)=> {
            console.log(Math.floor(duration - currentTime));
          })
        },500)
      }
    })
    fileReader.readAsDataURL(file);
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

  videoTime(callback:(currentTime:any,duration:any)=>void) {
    const _this = this;
    function time() {
      let video = _this.video.nativeElement as HTMLVideoElement;
      if(video.currentTime <= video.duration  - 1) {
        callback(video.currentTime,video.duration);
        setTimeout(time,1000);
      }
    }
    setTimeout(time,1000);
  }

  videoPlay_pause():void {
    if(this.videoStatus == false) {
      this.video.nativeElement.play();
      this.videoStatus = true;
    }else {
      this.video.nativeElement.pause();
      this.videoStatus = false;
    }
  }


}
