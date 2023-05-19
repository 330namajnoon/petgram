import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {httpClient} from "src/app/httpClient";
@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL:string = 'http://localhost:4000';
  // socket = io(this.URL);
  device!:string;
  constructor() {
    if(innerWidth > innerHeight) {
      this.device = "pc";
    }else {
      this.device = "mobile";
    }
  }

  getDevice():string {
    return this.device;
  }
  async downloadStorys() {

  }
}
