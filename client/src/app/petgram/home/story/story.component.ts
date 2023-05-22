import { Component,Input,ViewChild,ElementRef,AfterViewInit } from '@angular/core';
import { IStoryData } from 'src/app/interfaces/IStoryData';
import { AppService } from 'src/app/app.service';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements AfterViewInit {
  @ViewChild("container")container!:ElementRef;
  constructor(private appService:AppService,private homeService:HomeService) {}
  device:string = this.appService.getDevice();
  storysStyle = {'height':`${window.innerHeight-100}px`,'background-color':`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`};
  @Input()data!:IStoryData;
  @Input()id!:number;

  ngAfterViewInit(): void {
    let container:HTMLElement = this.container.nativeElement;
    container.addEventListener("touchstart",(e:TouchEvent)=> {
      let y1 = e.touches[0].pageY;
      container.addEventListener("touchend",(ee:TouchEvent)=> {
        let y2 = ee.changedTouches[0].pageY;
        let distancia = y2-y1;

        this.homeService.get("setScroll")(this.id,distancia);
      })
    })


  }



}
