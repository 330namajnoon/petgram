import { IUser } from 'src/interfaces/IUser';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from './app.service';
import { IPet } from 'src/interfaces/IPet';
@Injectable({
  providedIn: 'root'
})
export class RegisterService extends AppServiceEx {
  private newUser!: IUser;
  private image!: File;
  private scrollPromise: boolean = false;
  constructor(private http: HttpClient, private router: Router, appService: AppService) {
    super(appService)

  }
  setnewUser(user: IUser): void {
    this.newUser = user
  }

  login(email: string, password: string): any {
    let loginData = {
      email,
      password
    }
    this.http.post<IUser>(this.getURL() + "/login", loginData).subscribe((user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        this.setUser(user)
        console.log(user)
        this.router.navigateByUrl("/petgram");
      }
    })
  }
  signup():Promise<boolean> {
    console.log(this.newUser)
    return new Promise((resolve)=> {
      const formData = new FormData();
      formData.append("user",JSON.stringify(this.newUser));
      formData.append("file",this.image);
      this.http.post<boolean>(this.getURL() + "/signup",formData).subscribe((res) => {
        if (res) {
          this.router.navigateByUrl("/login");
        }else {
          resolve(res);
        }
      })
    })

  }
  getScrollPromise(): boolean {
    return this.scrollPromise;
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
