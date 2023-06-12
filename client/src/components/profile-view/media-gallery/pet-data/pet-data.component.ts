import { Component,Input } from '@angular/core';
import { IPet } from 'src/interfaces/IPet';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';
import { ProfileViewService } from 'src/services/profile-view.service';

@Component({
  selector: 'app-pet-data',
  templateUrl: './pet-data.component.html',
  styleUrls: ['./pet-data.component.scss']
})



export class PetDataComponent extends AppServiceEx {
  @Input()petData!:IPet;
  private display:boolean = false;
  constructor(appService:AppService,private profileVS:ProfileViewService) {
    super(appService);

  }

  getDisplayClass():string {
    return this.display == true ? 'open' : 'close';
  }

  setDisplay():void {
    this.display = this.display == false ? true : false;
  }

  getGalleryMenuSelected():boolean {
    if(this.profileVS.getGalleryMenuSelected() == this.petData.name) {
      return true;
    }else {
      return false;
    }
  }

}
