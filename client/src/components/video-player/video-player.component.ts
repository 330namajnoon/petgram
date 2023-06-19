import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent extends AppServiceEx implements AfterViewInit {
  @Input()src!:string;
  @Input()type!:string;
  @Input()style!:any;
  @ViewChild("video")video!:ElementRef;
  @ViewChild("span")span!:ElementRef;
  play:boolean = true;
  constructor(appS:AppService) {
    super(appS);



  }

  ngAfterViewInit():void {
    const video = this.video.nativeElement as HTMLSpanElement;
    let e1 = 0
    window.addEventListener("touchstart",(ee)=> {
      e1 = ee.changedTouches[0].pageY;
    })
    window.addEventListener("touchend",(e)=> {
      let d = Math.abs(e1 - e.changedTouches[0].pageY);
      if(d > 50) {
        setTimeout(()=> {
          let p = video.getBoundingClientRect();
          if(p.top > 0 && p.top < 100) {
            this.video.nativeElement.play();
            this.play = true;
          }else {
            this.video.nativeElement.pause();
            this.play = false;
          }
        },500)
      }
    })
  }

  play_pause():void {
    if(this.play){
      this.video.nativeElement.pause();
      this.play = false;
    }else {
      this.video.nativeElement.play();
      this.play = true;
    }
  }
}
