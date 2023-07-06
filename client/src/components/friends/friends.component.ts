import { Component } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IFollower } from 'src/interfaces/IFollower';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent extends AppServiceEx {
  followers!:IFollower[];
  constructor(appS:AppService) {
    super(appS)
    this.followers = this.getUser().followers;
  }
}
