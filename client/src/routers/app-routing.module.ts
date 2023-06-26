import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { IUser } from 'src/interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { RegisterService } from 'src/services/register.service';
import { ErrorComponent } from 'src/components/error/error.component';
const routes: Routes = [
  { path: "", loadChildren: () => import("../modules/register.module").then(m => m.RegisterModule) },
  { path: "error",component:ErrorComponent},
  { path: "petgram", loadChildren: () => import("../modules/petgram.module").then(m => m.PetgramModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule extends AppServiceEx {

  constructor(private httpClient: HttpClient, private router: Router, appService: AppService,private registerS:RegisterService) {
    super(appService);
    if (localStorage.getItem("user")) {
      const userData = JSON.parse(localStorage.getItem("user") || "") as {email:string,password:string};
      const _this = this;
      async function login() {
        let res = await _this.registerS.login(userData.email,userData.password);
        if(!res.error) {
          _this.setUser(res.data);
          localStorage.setItem("user",JSON.stringify({email:res.data.email,password:res.data.password}));
          // router.navigate(["/signup"])
          // router.navigate(["/petgram"]);
          // let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
          // url[0] = "/" + url[0];
          // url.push("profile_view");
          // this.router.navigate(url, { state: { user: 'A1b2C3d4E5' } });
        }else {
          router.navigate([""])
        }
      }
      login()
    } else {
      this.router.navigateByUrl("/login")
    }
  }

}
