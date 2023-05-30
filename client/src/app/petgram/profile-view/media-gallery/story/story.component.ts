import { Component,Input } from '@angular/core';
import { ProfileViewService } from '../../profile-view.service';
import { AppService } from 'src/app/app.service';
import { IPet } from 'src/app/interfaces/IPet';
import { IStory } from 'src/app/interfaces/IStory';
import { Router } from '@angular/router';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent {
  @Input()index!:number;
  @Input()user!:string;
  @Input()id!:string;
  @Input()pet!:string;
  @Input()petData!:IPet;
  @Input()storyData!:IStory;
  constructor(private appS:AppService,private profileS:ProfileViewService,private router:Router) {}

  getDevice():string {
    return this.appS.getDevice();
  }

  getStorysView():void {
    this.router.navigate(["/petgram","profile_view","storys_view"],{state:{data:[1,2,3]}})
  }
}
