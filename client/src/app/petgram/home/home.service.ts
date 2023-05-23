import { Injectable } from '@angular/core';
import { IStoryData } from 'src/app/interfaces/IStoryData';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private storysData:IStoryData[] = [];
  private methods:any = {};
  constructor() {

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



}
