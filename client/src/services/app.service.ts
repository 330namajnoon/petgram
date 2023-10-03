import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { httpClient } from "src/assets/ts/httpClient";
import { IUser } from 'src/interfaces/IUser';
import { Languages } from 'src/assets/js/Languages';
import { Colors } from 'src/assets/js/Colors';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private loadingDisplay: boolean = false;
  private user!: IUser;
  private URL: string = 'http://localhost:4000';
  // private URL: string = 'https://abc3-94-73-37-80.ngrok-free.app';
  socket = io(this.URL);
  language: Languages = new Languages();
  colors: Colors = new Colors();
  types: { img: string[], video: string[] } = {
    img: ["png", "jpg", "jpeg", "fig"],
    video: ["mkv", "mp4"]
  }
  constructor(private http: HttpClient, private router: Router) {
    this.colors.setColors(0);
    // window.addEventListener("resize", () => {
    //   router.navigate(["/petgram"]);
    // })
  }

  typePromise(tagName: string = "img" || "video", type: string): boolean {
    let promise = true;
    switch (tagName) {
      case "img":
        let ip = this.types.img.find(t => t == type)
        if (!ip) {
          promise = false;
        }
        break;
      case "video":
        let vp = this.types.video.find(t => t == type)
        if (!vp) {
          promise = false;
        }
        break;

    }
    return promise;
  }

  setLoading(value: boolean): void {
    this.loadingDisplay = value;
  }

  async loadUser() {
    return new Promise((resolve) => {
      if (localStorage.getItem("user")) {
        const userData = JSON.parse(localStorage.getItem("user") || "") as { email: string, password: string };
        this.http.post<IHTTPResponse<IUser>>(this.getURL() + "/login", userData).subscribe((res) => {
          if (res.data) {
            this.setUser(res.data);
            localStorage.setItem("user", JSON.stringify({ email: res.data.email, password: res.data.password }));
          }
          resolve(true);
        })
      } else {
        resolve(false);
      }
    })
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

  getLoading(): boolean {
    return this.loadingDisplay;
  }

  createNewUnikID(data: any[], length: number): string {
    let newID: string = "PG";
    let cs = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz0123456789";
    let t: boolean = true;
    while (t) {
      let id: string = newID;
      for (let index = 0; index < length - 2; index++) {
        id += cs.charAt(Math.floor(Math.random() * cs.length));
      }
      let f: any = data.find(d => d.id == id);
      if (!f) {
        newID = id;
        t = false;
      }
    }
    return newID;
  }
  async downloadStorys() {

  }





}
