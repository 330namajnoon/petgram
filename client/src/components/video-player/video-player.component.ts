import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent extends AppServiceEx  {
  @Input()src!:string;
  @Input()style!:any;
  @ViewChild("video")video!:ElementRef;
  @ViewChild("button")button!:ElementRef;
  play:boolean = true;
  constructor(appS:AppService) {
    super(appS);

  }

  play_pause():void {
    if(this.play) {
      this.video.nativeElement.pause();
      this.play = false;
    }else {
      this.video.nativeElement.play();
      this.play = true;
    }
  }



}
