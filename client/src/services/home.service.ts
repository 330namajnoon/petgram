import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { HttpClient } from '@angular/common/http';
import { IStoryLink } from 'src/interfaces/IStoryLink';
@Injectable({
  providedIn: 'root'
})
export class HomeService extends AppServiceEx {
  private storysData:IStoryLink[] = [];
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
  setStorysLink(storysData:IStoryLink[]):void {
    this.storysData = storysData;
  }
  getStorysLink():IStoryLink[] {
    return this.storysData;
  }

  async downloadStorys() {
    this.http.get<IStoryLink[]>(`${this.getURL()}/storysLink`).subscribe((storys)=> {
      this.setStorysLink(storys);
      console.log(storys)
    })
  }

}
