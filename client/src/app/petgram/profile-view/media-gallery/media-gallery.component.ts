import { Component,Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ProfileViewService } from '../profile-view.service';
import { IStory } from 'src/app/interfaces/IStory';
import { IStoryAdress } from 'src/app/interfaces/IStoryAdress';
@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent {
  @Input()name!:string;
  @Input()user!:string;
  @Input()storys!:IStoryAdress;

  constructor(private appService:AppService,private profileS:ProfileViewService){
    console.log(this.storys)
  }
  getDevice():string {
    return this.appService.getDevice();
  }

  setDisplayStyile():void {
    this.profileS.setGalleryMenuSelected(this.name);
  }

  getDisplayStyile():string {
    if(this.profileS.getGalleryMenuSelected() == this.name) {
      return "selected";
    }else {
      return "onSelected";
    }
  }
}
