import { Component,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { IStory } from 'src/interfaces/IStory';

@Component({
  selector: 'app-storys-view',
  templateUrl: './storys-view.component.html',
  styleUrls: ['./storys-view.component.scss']
})
export class StorysViewComponent implements AfterViewInit {
  index:number = 0;
  storys!:IStory[];
  constructor(private appS:AppService,private router:Router) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    if(state) {
      let data = state as {storys:IStory[],index:number};
      this.storys = data.storys;
      this.index = data.index;
    }
  }

  ngAfterViewInit(): void {
    let container:HTMLElement|null = document.getElementById("storys_view_container");
    if(container) {
      let scrollHeight = container.scrollHeight;
      let storyScroll:number = this.index*(scrollHeight / this.storys.length);
      container.scrollTop = storyScroll;
    }
  }

  getDevice():string {
    return this.appS.getDevice();
  }


  getProfileView():void {
    let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
    url = url.slice(0,-1);
    url[0] = "/"+url[0];
    this.router.navigate(url,{state:{user:this.storys[0].id}});

  }
}
