import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { httpClient } from "src/assets/ts/httpClient";
import { IUser } from 'src/interfaces/IUser';
import { Languages } from 'src/assets/js/Languages';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loadingDisplay:boolean = false;
  private user!: IUser;
  private URL: string = 'http://localhost:4000';
  // private URL: string = 'https://abc3-94-73-37-80.ngrok-free.app';
  socket = io(this.URL);
  language: Languages = new Languages();
  types: { img: string[], video: string[] } = {
    img: ["png", "jpg", "jpeg", "fig"],
    video: ["mkv", "mp4"]
  }
  constructor(private router:Router) {
    window.addEventListener("resize",()=> {
      router.navigate(["/petgram"]);
    })
  }

  typePromise(tagName: string = "img" || "video", type: string): boolean {
    let promise = true;
    switch (tagName) {
      case "img":
        let ip = this.types.img.find(t => t == type)
        if(!ip) {
          promise = false;
        }
        break;
      case "video":
        let vp = this.types.video.find(t => t == type)
        if(!vp) {
          promise = false;
        }
        break;

    }
    return promise;
  }

  setLoading(value:boolean):void {
    this.loadingDisplay = value;
  }

  setUser(user: IUser): void {

    this.user = user;
  }
  getUser(): IUser {
    return this.user;
  }

  getDevice(): string {
    let clas: string = "";
    if (innerWidth > innerHeight) {
      clas = "container_pc";
    } else {
      clas = "container_mobile";
    }
    return clas;
  }
  getURL(): string {
    return this.URL;
  }

  getLoading():boolean {
    return this.loadingDisplay;
  }

  createNewUnikID(data:any[],length:number):string {
    let newID:string = "PG";
    let cs = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz0123456789";
    let t:boolean = true;
    while(t) {
      let id:string = newID;
      for (let index = 0; index < length-2; index++) {
        id += cs.charAt(Math.floor(Math.random()*cs.length));
      }
      let f:any = data.find(d => d.id == id);
      if(!f) {
        newID = id;
        t = false;
      }
    }
    return newID;
  }
  async downloadStorys() {

  }





}
