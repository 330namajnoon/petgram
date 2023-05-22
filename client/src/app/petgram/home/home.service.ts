import { Injectable } from '@angular/core';
import { IStoryData } from 'src/app/interfaces/IStoryData';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private storysData:IStoryData[] = [];
  private storysContainer:any[] = [];
  private methods:any = {};
  constructor() {
    window.addEventListener("click",()=> {
      console.log(this.storysContainer)
    })
  }
  set(name:string,value:any):void {
    this.methods[name] = value;
  }
  get(name:string):any {
    return this.methods[name];
  }
  setStorysData(storysData:IStoryData[]):void {
    this.storysData = storysData;
  }
  getStorysData():IStoryData[] {
    return this.storysData;
  }
  // setStorysContainer(container:HTMLElement):void {
  //   let data = {id:this.setStorysContainer.length+1,container};
  //   data.container.addEventListener("touchstart",(e:TouchEvent)=> {
  //     let y1 = e.touches[0].pageY;
  //     data.container.addEventListener("touchend",(ee:TouchEvent)=> {
  //       let y2 = ee.changedTouches[0].pageY;
  //       let distancia = y2-y1 > 0 ? y2-y1 : Math.abs(y2-y1);
  //       console.log();
  //       if(distancia > 200) {
  //         let nextElement:any = this.storysContainer.filter(c => c.id == data.id + 1);
  //         nextElement.scrollIntoView({behavior:"smooth"});
  //       }else {
  //         scrollToDiv("sina")
  //         container.scrollIntoView({behavior:"smooth"});

  //       }
  //     })
  //   })
  //   this.storysContainer.push(data);

  // }


}
