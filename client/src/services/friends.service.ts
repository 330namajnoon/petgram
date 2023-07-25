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
import { IFollower } from 'src/interfaces/IFollower';
import { IUserData } from 'src/interfaces/IUserData';
import { MatTableDataSource } from '@angular/material/table';


@Injectable({
  providedIn: 'root'
})
export class FriendsService extends AppServiceEx {
  public userData: IUserData | undefined
  // followers: IFollower[] = [];
  // pendingFollowers: IFollower[] = [];
  // following: IFollower[] = [];
  dsFollowers: any;
  dsPendingFollowers: any;
  dsFollowing: any;


  constructor(private http: HttpClient, appService: AppService, private homeService: HomeService, private router: Router) {
    super(appService);
  }

  profileData() {
    this.http.post<IHTTPResponse<IUserData>>(this.getURL() + "/profileData", { user: this.getUser().id }).subscribe((resp) => {
      if (resp.error) {
        this.router.navigate(["/error"], { state: { error: resp.error } });
      } else {
        console.log(resp.data)
        this.userData = resp.data;
        this.dsFollowers = new MatTableDataSource(this.userData.followers);
        this.dsPendingFollowers = new MatTableDataSource(this.userData.pendingFollowers);
        this.dsFollowing = new MatTableDataSource(this.userData.following);
      }
    })
  }

  follow(user_id: string, follower_id: string) {
    this.socket.emit("follow",user_id,follower_id);
  }

  accept(user_id: string, follower_id: string) {
    this.socket.emit("accept",user_id,follower_id);
    // this.http.put<IHTTPResponse<any>>(`${this.getURL()}/follow/accept`, {
    //   user_id: user_id, follower_id: follower_id
    // }).subscribe((resp) => {
    //   if (resp.error) {
    //     this.router.navigate(["/error"], { state: { error: resp.error } });
    //   } else {
    //     this.profileData()
    //   }
    // });
  }

  delete(user_id: string, follower_id: string) {
    this.http.delete<IHTTPResponse<any>>(`${this.getURL()}/follow/delete`, {
      body: { user_id: user_id, follower_id: follower_id }
    }).subscribe((resp) => {
      if (resp.error) {
        this.router.navigate(["/error"], { state: { error: resp.error } });
      } else {
        this.profileData()
      }
    });
  }
}
