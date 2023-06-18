import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { IUser } from 'src/interfaces/IUser';
import { HttpClient } from '@angular/common/http';
import { AppServiceEx } from 'src/extends/AppServiceEx';

const routes: Routes = [
  { path: "", loadChildren: () => import("../modules/register.module").then(m => m.RegisterModule) },
  { path: "petgram", loadChildren: () => import("../modules/petgram.module").then(m => m.PetgramModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule extends AppServiceEx {

  constructor(private httpClient: HttpClient, private router: Router, appService: AppService) {
    super(appService);
    if (localStorage.getItem("user")) {
      httpClient.post<IUser[]>(`${this.getURL()}/login`, JSON.parse(localStorage.getItem("user") || '')).subscribe(user => {
        if (user.length > 0) {
          this.setUser(user[0]);
          router.navigate(["/signup"])
          // router.navigate(["/petgram"])
          // let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
          // url[0] = "/" + url[0];
          // url.push("profile_view");
          // this.router.navigate(url, { state: { user: 'A1b2C3d4E5' } });
        } else {
          router.navigate(["/login"])

        }
      }, error => {
        console.log(error)
      })

    } else {
      this.router.navigateByUrl("signup/data-pet")

    }
  }

}
