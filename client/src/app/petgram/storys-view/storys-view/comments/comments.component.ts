import { AppService } from 'src/app/app.service';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';
import { Component,Input,OnInit,AfterViewInit,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICommends } from 'src/app/interfaces/ICommends';
import { IStory } from 'src/app/interfaces/IStory';
import { HomeService } from 'src/app/petgram/home/home.service';
import { ICommendsData } from 'src/app/interfaces/ICommensData';
import { FormGroup,FormControl } from '@angular/forms';
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
      console.log(this.story)
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
      let _date:string = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();
      let time:string = date.getHours()+":"+date.getMinutes();
      let commend:ICommends = {
        commend:this.chatBox.nativeElement.value,
        user:this.getUser().user,
        userName:this.getUser().userName,
        date:_date,
        time
      }
      this.socket.emit("commend",this.story,commend)
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
