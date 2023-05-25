import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {httpClient} from "src/app/httpClient";
import { IUser } from './interfaces/IUser';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private user!:IUser;
  private URL:string = 'http://localhost:4000';
  socket = io(this.URL);

  constructor() {

  }

  setUser(user:IUser):void {
    this.user = user;
  }
  getUser():IUser {
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
