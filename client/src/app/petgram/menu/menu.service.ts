import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

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
