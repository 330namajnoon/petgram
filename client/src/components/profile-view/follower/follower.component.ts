import { Component,Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent {
  @Input()device!:string;
  @Input()fullName!:string;
  @Input()user!:string;
  @Input()Image!:string;
  constructor(private router:Router) {}
  getProfile() {
    let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
    url[0] = "/" + url[0];
    url.push("profile_view");
    this.router.navigate(url, { state: { user:this.user} });
  }
}
