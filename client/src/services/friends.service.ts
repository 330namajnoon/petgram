import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';
import { ILike } from 'src/interfaces/ILike';
import { IStory } from 'src/interfaces/IStory';
import { IView } from 'src/interfaces/IView';
import { AppService } from './app.service';
import { HomeService } from './home.service';


@Injectable({
  providedIn: 'root'
})
export class FriendsService extends AppServiceEx {

  constructor(private http: HttpClient, appService: AppService, private homeService: HomeService, private router: Router) {
    super(appService);
  }

  follow(user_id: string, follower_id: string) {
    this.http.post<IHTTPResponse<any>>(`${this.getURL()}/follow`, {
      user_id: user_id, follower_id: follower_id
    }).subscribe((resp) => {
      if (resp.error) {
        this.router.navigate(["/error"], { state: { error: resp.error } });
      } else {
        console.log('follow success')
      }
    });
  }
}
