import { AppService } from './../../../app.service';
import { Component,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IComments } from 'src/app/interfaces/IComments';
import { IStory } from 'src/app/interfaces/IStory';
import { HomeService } from '../home.service';
import { ICommentsData } from 'src/app/interfaces/ICommentsData';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent  {
  commentsData!:ICommentsData;
  constructor(private actRouter:ActivatedRoute,private appService:AppService,private homeService:HomeService){
    this.actRouter.params.subscribe(params => {
      let id = params["id"];
      this.commentsData = {story:this.homeService.get(id).getStory(),comments:this.homeService.get(id).getComments()};
    })
  }

  getDevice(): string {
      return this.appService.getDevice();
  }

}
