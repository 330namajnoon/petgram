
import { Component,Input,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommends } from 'src/interfaces/ICommends';
import { IStory } from 'src/interfaces/IStory';
import { HomeService } from 'src/services/home.service';
import { ICommendsData } from 'src/interfaces/ICommensData';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends AppServiceEx implements OnInit,AfterViewInit {
  commendsData!:ICommendsData;
  @ViewChild("chatBox")chatBox!:ElementRef;
  @ViewChild("commendsContainer")commendsContainer!:ElementRef;
  constructor(private actRouter:ActivatedRoute,appService:AppService,private homeService:HomeService){
    super(appService);
    this.actRouter.params.subscribe(params => {
      let id = params["id"];
      this.commendsData = {story:this.homeService.get(id).getStory(),commends:this.homeService.get(id).getCommends()};
    })
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

    this.socket.on("commend"+this.commendsData.story.id,(commend)=> {
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
      let commend:ICommends = {
        commend:this.chatBox.nativeElement.value,
        user:this.getUser().email,
        userName:this.getUser().name,
        date:_date,
        time
      }
      this.socket.emit("commend",this.commendsData.story,commend)
      this.chatBox.nativeElement.value = "";
    }
  }


  setScroll():void {
    let cb:any = this.commendsContainer.nativeElement;
    let cbP = cb.getBoundingClientRect();
    if(cb.scrollHeight > cbP.height) {
      cb.scrollTop = cb.scrollHeight - cbP.height;
    }
  }

}
