import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {httpClient} from "src/app/httpClient";
import { IUser } from './interfaces/IUser';
import { IUserData } from './interfaces/IUserData';
import { Languages } from 'src/assets/js/Languages';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private user!:IUserData;
  private URL:string = 'http://localhost:4000';
  socket = io(this.URL);
  imageTypes:string[] = ["jpeg","png","gif","jpg"];
  videoTypes:string[] = ["mp4","mkv"];
  language:Languages = new Languages();
  constructor() {

  }

  promiseType(tagName:string = "img" || "video",type:any):boolean {
    let p:boolean = true;
    switch (tagName) {
      case "img":
          if(!this.imageTypes.find(t => t == type)) p = false;
        break;
        case "video":
          if(!this.videoTypes.find(t => t == type)) p = false;
        break;
    }
    return p;
  }

  setUser(user:IUserData):void {
    this.user = user;
  }
  getUser():IUserData {
    return this.user;
  }

  getDevice():string {
    let clas:string = "";
    if(innerWidth > innerHeight) {
      clas = "container_pc";
    }else {
      clas = "container_mobile";
    }
    return clas;
  }
  getURL():string {
    return this.URL;
  }
  async downloadStorys() {

  }

  createNewID(ids:any[],length:number):string {
    let l:string = "absdefghijklnmopqrstuvwxyzABCDEFGHEJKLNMOPQRSTUVWXYZ0123456789";
    let t:boolean = true;
    let newId:string = "";
    while(t) {
      newId = "id";
      for (let index = 0; index < length; index++) {
        newId += l.charAt(Math.floor(Math.random()*l.length));
      }
      let idSearch:any = ids.find(d => d.id == newId);
      if(!idSearch) t = false;
    }
    return newId;
  }
}
