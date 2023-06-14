import { Component,Input } from '@angular/core';
import { IComment } from 'src/interfaces/IComment';
import { HomeService } from 'src/services/home.service';
import { AppService } from 'src/services/app.service';
@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent {
  @Input()commendData!:IComment;
  constructor(private homeService:HomeService,private appService:AppService) {

  }

  getDevice():string {
    return this.appService.getDevice();
  }
  getUser():string {
    return this.appService.getUser().id;
  }
}
