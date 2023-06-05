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
  language:Languages = new Languages();
  constructor() {

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
}
