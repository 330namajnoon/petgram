import { Component,Input } from '@angular/core';
import { ICommends } from 'src/app/interfaces/ICommends';
import { HomeService } from 'src/app/petgram/home/home.service';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent {
  @Input()commendData!:ICommends;
  constructor(private homeService:HomeService,private appService:AppService) {

  }

  getDevice():string {
    return this.appService.getDevice();
  }
  getUser():string {
    return this.appService.getUser().user;
  }
}
