import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';

@Injectable({
  providedIn: 'root'
})
export class MenuService  extends AppServiceEx {
  constructor(appService:AppService) {
    super(appService)
  }
  options = [
    {name:"home",url:"home"},
    {name:"photo_camera",url:"storys"},
    {name:"handshake",url:"friends"},
    {name:"settings",url:"settings"},
  ]
  select:string = this.options[0].name;


  setPage(name:string,url:string) {
    this.select = name;
  }

}
