import { Injectable } from '@angular/core';
import { httpClient } from '../httpClient';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
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
          httpClient("POST", this.appService.getURL() + "/login", [{ name: "user", value: JSON.stringify({ user, password }) }], (data, loaded) => {
            if (JSON.parse(data) && loaded == 100) {
              localStorage.setItem("user", JSON.stringify({ user, password }));
              this.appService.setUser(JSON.parse(data))
              this.router.navigateByUrl("/petgram");
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
