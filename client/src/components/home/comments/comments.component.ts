
import { Component,Input,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComment } from 'src/interfaces/IComment';
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
  story!:IStory;
  @ViewChild("chatBox")chatBox!:ElementRef;
  @ViewChild("commendsContainer")commendsContainer!:ElementRef;
  constructor(private actRouter:ActivatedRoute,appService:AppService,private homeService:HomeService){
    super(appService);
    this.actRouter.params.subscribe(params => {
      let id = params["id"];
      this.story = this.homeService.get(id).getStory();
    })
  }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

    this.socket.on("comment"+this.story.id,(comment)=> {
      setTimeout(() => {
        this.setScroll();
      }, 100);
    })
    this.setScroll()

  }
  sendCommend():void {

    if(this.chatBox.nativeElement.value !== "") {
      let date:Date = new Date();
      let _date:string = date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      let time:string = date.getHours()+":"+date.getMinutes();
      let comment:IComment = {
        comment:this.chatBox.nativeElement.value,
        story_id:this.story.id,
        user_id:this.getUser().id,
        fullName:this.getUser().name + " " + this.getUser().lastName,
        date:_date,
        time,
      }
      this.socket.emit("comment",comment);
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
