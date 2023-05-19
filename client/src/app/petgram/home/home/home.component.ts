import { Component } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  storys = [];
  constructor(private appService:AppService){}
  device:string = this.appService.getDevice();
  storysStyle = {'height':`${window.innerHeight-100}px`};
}
