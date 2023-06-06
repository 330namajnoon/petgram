import { NgModule } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { AppService } from './app.service';
import { httpClient } from './httpClient';
import { IUser } from './interfaces/IUser';
import { IUserData } from './interfaces/IUserData';


const routes: Routes = [
  {path:"",loadChildren:()=> import("./register/register.module").then(m => m.RegisterModule)},
  {path:"petgram",loadChildren:()=> import("./petgram/petgram.module").then(m => m.PetgramModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(private router:Router,private appService:AppService) {

    if(localStorage.getItem("user")) {
      httpClient<IUserData>("POST",this.appService.getURL()+"/login",[{name:"user",value:localStorage.getItem("user")||""}],(data,loaded)=> {
        if(data) {
          this.appService.setUser(data)
          this.router.navigateByUrl("petgram/storys");
        }else {
          this.router.navigateByUrl("login");
        }
      })
    }else {
      this.router.navigateByUrl("")
    }
  }

}
