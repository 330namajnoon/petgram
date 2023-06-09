import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';

@Injectable({
  providedIn: 'root'
})
export class MenuService extends AppServiceEx {
  constructor(appService: AppService) {
    super(appService)
  }
  options = [
    { name: "home", url: "/petgram" },
    { name: "photo_camera", url: "/petgram/storys" },
    { name: "handshake", url: "/petgram/friends" },
    { name: "settings", url: "/petgram/settings" },
  ]
  select: string = this.options[0].name;


  setPage(name: string, url: string) {
    this.select = name;
  }

}
