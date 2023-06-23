import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { HttpClient } from '@angular/common/http';
import { IStoryLink } from 'src/interfaces/IStoryLink';
import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends AppServiceEx {
  private storysData:IStoryLink[] = [];
  private methods:any = {};
  private videoPlayerControl!:any;
  constructor(private http:HttpClient,appService:AppService,private router:Router) {
    super(appService);
  }
  set(name:string,value:any):void {
    this.methods[name] = value;
  }
  get(name:string):any {
    return this.methods[name];
  }
  getVideoPlayerControl():any {
    return this.videoPlayerControl;
  }
  setideoPlayerControl(control:any):void {
    this.videoPlayerControl = control;
  }
  setStorysLink(storysData:IStoryLink[]):void {
    this.storysData = storysData;
  }
  getStorysLink():IStoryLink[] {
    return this.storysData;
  }

  downloadStorys() {
    this.http.get<IHTTPResponse<IStoryLink[]>>(`${this.getURL()}/storysLink`).subscribe((res)=> {
      if(!res.error) {
        this.setStorysLink(res.data);
      }else {
        this.router.navigate(["/error"],{state:{error:res.error}});
      }
    })
  }

}
