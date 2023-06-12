import { Component,Input } from '@angular/core';
import { AppService } from 'src/services/app.service';
import { ProfileViewService } from 'src/services/profile-view.service';
import { IStory } from 'src/interfaces/IStory';
import { IStoryAdress } from 'src/interfaces/IStoryAdress';
import { IPet } from 'src/interfaces/IPet';
@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent {
  @Input()name!:string;
  @Input()user!:string;
  @Input()storys!:IStoryAdress[];
  @Input()petData!:IPet;
  constructor(private appService:AppService,private profileS:ProfileViewService){

  }
  getDevice():string {
    return this.appService.getDevice();
  }

  setDisplayStyile():void {
    this.profileS.setGalleryMenuSelected(this.name);
  }

  getPetData():IPet {
    return this.petData;
  }

  getDisplayStyile():string {
    if(this.profileS.getGalleryMenuSelected() == this.name) {
      return "selected";
    }else {
      return "onSelected";
    }
  }
}
