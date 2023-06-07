import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IStoryData } from 'src/interfaces/IStoryData';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HomeService extends AppServiceEx {
  private storysData:IStoryData[] = [];
  private methods:any = {};
  constructor(private http:HttpClient,appService:AppService) {
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
    this.http.get<IStoryData[]>(`${this.getURL()}/storysAdres`).subscribe((storys)=> {
      this.setStorysData(storys.filter(s => s.email !== this.getUser().email));
    })
  }

}
