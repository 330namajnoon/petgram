import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent {
  constructor(private router: Router,private appS:AppService) {}

  redirectToLogin(){
    this.router.navigate(['/login'])
  }

  getDevice():string {
    return this.appS.getDevice();
  }

}
