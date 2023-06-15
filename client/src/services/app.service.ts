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
    this.language.setLanguage("spanish");
    window.addEventListener("resize",()=> {
      router.navigate(["/petgram"]);
    })
  }

  typePromise(tagName: string = "img" || "video", type: string): boolean {
    let promise = true;
    switch (tagName) {
      case "img":
        let ip = this.types.img.find(t => t == type)
        if(ip && ip.length <= 0) {
          promise = false;
        }
        break;
      case "video":
        let vp = this.types.video.find(t => t == type)
        if(vp && vp.length <= 0) {
          promise = false;
        }
        break;

    }
    return promise;
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
  async downloadStorys() {

  }


}
