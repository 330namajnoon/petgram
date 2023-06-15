import { Component,Input } from '@angular/core';
import { ProfileViewService } from 'src/services/profile-view.service';
import { AppService } from 'src/services/app.service';
import { IPet } from 'src/interfaces/IPet';
import { IStory } from 'src/interfaces/IStory';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
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
    if(this.pet !== this.language.getWord('all_storys')) {
      storys = this.profileS.getStorysByPetName(this.pet);
    }else {
      storys = this.profileS.getStorys();
    }
    let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
    url[0] = "/"+url[0];
    url.push("storys_view");
    this.router.navigate(url,{state:{storys,index:this.index}});
  }

  getStory():IStory|undefined {
    return this.profileS.getStoryById(this.id);
  }
}
