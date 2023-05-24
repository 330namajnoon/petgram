import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import {httpClient} from "src/app/httpClient";
@Injectable({
  providedIn: 'root'
})
export class AppService {
  URL:string = 'http://localhost:4000';
  // socket = io(this.URL);

  constructor() {

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
  async downloadStorys() {

  }
}
