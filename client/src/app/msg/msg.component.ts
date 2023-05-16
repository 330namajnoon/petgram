import { Component,ViewChild,ElementRef } from '@angular/core';
import { AppService } from '../app.service';
interface IMsg {
  name:string;
  msg:string;
}

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.scss']
})
export class MsgComponent {
  msgs:IMsg[] = [];
  name:any;
  @ViewChild("msg")msg!:ElementRef;
  constructor(private appService:AppService) {
    this.name = prompt("name");

    appService.socket.on("msg",(msg)=> {
      this.msgs.push(msg);
    })
  }

  enviar():void {
    let msg = this.msg.nativeElement.value;
    this.appService.socket.emit("msg",{name:this.name,msg});
    this.msg.nativeElement.value = "";
  }
}
