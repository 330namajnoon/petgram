import { Injectable } from '@angular/core';
import { httpClient } from '../httpClient';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { IUser } from '../interfaces/IUser';
import { IUserData } from '../interfaces/IUserData';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private router: Router, private appService: AppService) {


  }
  signup(email: string, password: string): string {
    if (email !== "") {
      if (password !== "") {
        if (email.includes("@")) {
          let user: string = email.split("@")[0];
          if (password.length >= 8) {
            if (password.split("").filter(c => parseInt(c)).length > 0) {
              return "login";
            } else {
              return "passvord c and number";
            }
          } else {
            return "passvord > 8 "
          }
        } else {
          return "no esta correcta!!";
        }
      } else {
        return "password??";
      }
    } else {
      return "email???";
    }
  }
  login(email: string, password: string): any {
    if (email !== "") {
      if (password !== "") {
        if (email.includes("@")) {
          let user: string = email.split("@")[0];
          httpClient<IUserData>("POST", this.appService.getURL() + "/login", [{ name: "user", value: JSON.stringify({ user, password }) }], (data, loaded) => {
            if (data && loaded == 100) {
              localStorage.setItem("user", JSON.stringify({ user, password }));
              this.appService.setUser(data)
              this.router.navigateByUrl("/petgram");
              this.appService.language.setLanguage(data.language);
            }

          })

        } else {
          return "email no es correcto!!";
        }
      } else {
        return "password??";
      }
    } else {
      return "email???";
    }

  }
}
