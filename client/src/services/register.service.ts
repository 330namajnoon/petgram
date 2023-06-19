import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from './app.service';
import { IUser } from 'src/interfaces/IUser';
@Injectable({
  providedIn: 'root'
})
export class RegisterService extends AppServiceEx {
  private scrollPromise:boolean = false;
  constructor(private http:HttpClient,private router: Router,appService:AppService) {
    super(appService)

  }
  signup(email: string, password: string): string {
   return ""
  }
  login(email: string, password: string): any {
    let loginData = {
      email,
      password
    }
    this.http.post<IUser>(this.getURL() + "/login",loginData).subscribe((user)=> {
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        this.setUser(user)
        console.log(user)
        this.router.navigateByUrl("/petgram");
      }
    })
  }
  getScrollPromise():boolean {
    return this.scrollPromise;
  }
  setScrollPromise(value:boolean):void {
    this.scrollPromise = value;
  }
}
