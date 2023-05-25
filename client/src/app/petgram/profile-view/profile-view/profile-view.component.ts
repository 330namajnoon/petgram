import { Component } from '@angular/core';
import {ActivatedRoute } from '@angular/router';
import { HomeService } from '../../home/home.service';
import { AppService } from 'src/app/app.service';
import { IProfileView } from 'src/app/interfaces/IProfileView';
import { httpClient } from 'src/app/httpClient';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent {
  profileData!:IProfileView;
  constructor(private acRoute:ActivatedRoute,private homeService:HomeService,private appService:AppService) {
    this.acRoute.params.subscribe(pr => {
      let user:string = this.homeService.get(`story${pr["id"]}`).story.user;
      console.log(user);
    })
  }

  getdevice():string {
    return this.appService.getDevice();
  }
}
