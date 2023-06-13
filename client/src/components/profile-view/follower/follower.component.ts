import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent extends AppServiceEx {
  @Input()device!:string;
  @Input()fullName!:string;
  @Input()user!:string;
  @Input()Image!:string;
  constructor(appServise:AppService,private router:Router) {
    super(appServise);
  }
  getProfile() {
    let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
    url[0] = "/" + url[0];
    url.push("profile_view");
    this.router.navigate(url, { state: { user:this.user} });
  }
}
