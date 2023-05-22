import { Component,OnInit } from '@angular/core';
import {animation} from "src/app/animation";
import { AppService } from 'src/app/app.service';
import { IStoryData } from 'src/app/interfaces/IStoryData';
import { httpClient } from 'src/app/httpClient';
import { HomeService } from '../home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private appService:AppService,private homeService:HomeService){
    homeService.set("setScroll",this.setScroll.bind(this));
  }
  device:string = this.appService.getDevice();
  storysStyle = {'height':`${window.innerHeight-100}px`};
  setScroll(id:number,distancia:number):void {
    let container:any = document.getElementById("home_storys");
    if(distancia < 0 && document.getElementById("story"+(id+1))) {
      let story:any = document.getElementById("story"+(id+1));
      let storyP:any = story.getBoundingClientRect()

      let frame:number = (storyP.top - (container.scrollTop-Math.abs(distancia/3)))/10;

      animation(10,(f)=> {
        container.scrollTop += frame;
      })
    }
    if(distancia > 0 && document.getElementById("story"+(id-1))) {
      let story:any = document.getElementById("story"+(id-1));
      let storyP:any = story.getBoundingClientRect()
      container.scrollTop -= storyP.top;

    }



  }
  async ngOnInit() {
    await httpClient("POST",this.appService.URL+"/downloadStorys",[],(data,loaded)=> {
      this.homeService.setStorysData(JSON.parse(data));

    })
  }

  getStorysData():IStoryData[] {
    return this.homeService.getStorysData();
  }
}
