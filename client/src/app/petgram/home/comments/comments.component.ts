import { AppService } from './../../../app.service';
import { Component,Input,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments } from 'src/app/interfaces/ICommends';
import { IStory } from 'src/app/interfaces/IStory';
import { HomeService } from '../home.service';
import { ICommendsData } from 'src/app/interfaces/ICommensData';
import { FormGroup,FormControl } from '@angular/forms';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit,AfterViewInit {
  commendsData!:ICommendsData;
  @ViewChild("chatBox")chatBox!:ElementRef;
  @ViewChild("commendsContainer")commendsContainer!:ElementRef;
  constructor(private actRouter:ActivatedRoute,private appService:AppService,private homeService:HomeService){
    this.actRouter.params.subscribe(params => {
      let id = params["id"];
      this.commendsData = {story:this.homeService.get(id).getStory(),commends:this.homeService.get(id).getCommends()};
    })
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

    this.appService.socket.on("commend"+this.commendsData.story.id,(commend)=> {
      setTimeout(() => {
        this.setScroll();
      }, 100);
    })
    this.setScroll()

  }
  sendCommend():void {
    if(this.chatBox.nativeElement.value !== "") {
      let date:Date = new Date();
      let _date:string = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
      let time:string = date.getHours()+":"+date.getMinutes();
      let commend:IComments = {
        commend:this.chatBox.nativeElement.value,
        user:this.appService.getUser().user,
        userName:this.appService.getUser().userName,
        date:_date,
        time
      }
      this.appService.socket.emit("commend",this.commendsData.story,commend)
      this.chatBox.nativeElement.value = "";
    }
  }
  getDevice(): string {
      return this.appService.getDevice();
  }

  setScroll():void {
    let cb:any = this.commendsContainer.nativeElement;
    let cbP = cb.getBoundingClientRect();
    if(cb.scrollHeight > cbP.height) {
      cb.scrollTop = cb.scrollHeight - cbP.height;
    }
  }

}
