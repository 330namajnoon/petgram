import { Component,Input } from '@angular/core';
import { ProfileViewService } from '../../profile-view.service';
import { AppService } from 'src/app/app.service';
import { IPet } from 'src/app/interfaces/IPet';
import { IStory } from 'src/app/interfaces/IStory';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent extends AppServiceEx {
  @Input()galleryName!:string;
  @Input()index!:number;
  @Input()user!:string;
  @Input()id!:string;
  @Input()pet!:string;
  @Input()storyData!:IStory;
  constructor( appS:AppService,private profileS:ProfileViewService,private router:Router) {
    super(appS);
  }





  getStorysView():void {
    let storys:IStory[] = [];
    if(this.pet !== "Todos Publicaciones") {
      storys = this.profileS.getStorysByPetName(this.pet);
    }else {
      storys = this.profileS.getStorys();
    }
    this.router.navigate(["/petgram","profile_view",this.user,"storys_view"],{state:{storys,index:this.index}});
  }

  getStory():IStory|undefined {
    return this.profileS.getStoryById(this.id);
  }
}
