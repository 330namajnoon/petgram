import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { Component,Input,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComment } from 'src/interfaces/IComment';
import { IStory } from 'src/interfaces/IStory';
import { HomeService } from 'src/services/home.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent extends AppServiceEx implements OnInit,AfterViewInit  {
  story!:IStory;
  @ViewChild("chatBox")chatBox!:ElementRef;
  @ViewChild("commendsContainer")commendsContainer!:ElementRef;
  constructor(private location:Location,private router:Router,appService:AppService,private homeService:HomeService){
    super(appService);
    let state = this.router.getCurrentNavigation()?.extras.state;
    if(state) {
      let data = state as {story:IStory};
      this.story = data.story;
    }

  }
  ngOnInit(): void {

  }
  back():void {
    this.location.back();
  }
  ngAfterViewInit(): void {
    this.socket.on("commend"+this.story.id,(commend)=> {
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
        story_id:this.story.id,
        comment:this.chatBox.nativeElement.value,
        user_id:this.getUser().id,
        fullName:this.getUser().name+' '+this.getUser().lastName,
        date:_date,
        time
      }
      this.socket.emit("commend",comment);
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
