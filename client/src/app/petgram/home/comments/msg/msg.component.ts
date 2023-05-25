import { Component,Input } from '@angular/core';
import { IComments } from 'src/app/interfaces/ICommends';
import { HomeService } from '../../home.service';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent {
  @Input()commendData!:IComments;
  constructor(private homeService:HomeService,private appService:AppService) {

  }

  getDevice():string {
    return this.appService.getDevice();
  }
  getUser():string {
    return this.appService.getUser().user;
  }
}
