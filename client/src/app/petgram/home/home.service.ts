import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';
import { IStoryData } from 'src/app/interfaces/IStoryData';
import { httpClient } from 'src/app/httpClient';
@Injectable({
  providedIn: 'root'
})
export class HomeService extends AppServiceEx {
  private storysData:IStoryData[] = [];
  private methods:any = {};
  constructor(appService:AppService) {
    super(appService);
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

  async downloadStorys() {
    await httpClient<IStoryData[]>(
      'POST',
      this.getURL() + '/downloadStorys',
      [],
      (data, loaded) => {
        if(loaded == 100) {
          this.setStorysData(data.filter(d => d.user !== this.getUser().user));
        }

      }
    );
  }

}
