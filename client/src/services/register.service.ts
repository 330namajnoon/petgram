import { IUser } from 'src/interfaces/IUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from './app.service';
import { IPet } from 'src/interfaces/IPet';
import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';
@Injectable({
  providedIn: 'root'
})
export class RegisterService extends AppServiceEx {
  private newUser!: IUser;
  private image!: File;
  private scrollPromise: boolean = false;
  private languageSelected:string = "";
  constructor(private http: HttpClient, private router: Router, appService: AppService) {
    super(appService)

  }
  setnewUser(user: IUser): void {
    this.newUser = user
  }

  login(email: string, password: string):Promise<IHTTPResponse<IUser>> {
    return new Promise((resolve)=> {
      let loginData = {
        email,
        password
      }
      this.http.post<IHTTPResponse<IUser>>(this.getURL() + "/login", loginData).subscribe((res) => {
        resolve(res);
    })
    })
  }
  signup():Promise<IHTTPResponse<string>> {
    return new Promise((resolve)=> {
      const formData = new FormData();
      formData.append("user",JSON.stringify(this.newUser));
      formData.append("file",this.image);
      this.http.post<IHTTPResponse<string>>(this.getURL() + "/signup",formData).subscribe((res) => {
        if (res.data) {
          this.router.navigateByUrl("/login");
        }else {
          resolve(res.error);
        }
      })
    })

  }
  getLanguage():string {
    return this.languageSelected;
  }
  getScrollPromise(): boolean {
    return this.scrollPromise;
  }

  getLenguages():Promise<IHTTPResponse<string[]>> {
    return new Promise((resolve)=> {
      this.http.get<IHTTPResponse<string[]>>(`${this.getURL()}/languages`).subscribe(res => {
        resolve(res)
      })
    })
  }

  setLanguage(language:string) {
    this.languageSelected = language;
  }
  setScrollPromise(value: boolean): void {
    this.scrollPromise = value;
  }
  setNewDataPet(newPet: IPet): void {
    this.newUser.pets.push(newPet)
  }
  setProfileImage(image: File): void {
    this.image = image
    console.log(this.image)
  }


}
