import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IFollower } from 'src/interfaces/IFollower';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';
import { FriendsService } from 'src/services/friends.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent extends AppServiceEx implements OnInit {

  displayedColumns: string[] = ['follower', 'action'];

  constructor(appS: AppService, public friendsService: FriendsService, private router: Router) {
    super(appS)
    /*
    console.log("friends c")
    for (let index = 0; index < 40; index++) {
      this.followers.push(
        { id: index + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'accepted' },
        { id: (index + 1) + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Pepito', status: 'pending' },
      );
      index++
      this.following.push(
        { id: index + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'accepted' },
        { id: (index + 1) + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Pepito', status: 'pending' },
      );
    }
    */
  }

  ngOnInit(): void {
    console.log("friends")
    setTimeout(() => {

      this.friendsService.profileData()
    }, 500);


  }
  acceptFollower(follower: IFollower) {
    console.log(follower)
    this.friendsService.accept(this.getUser().id, follower.id)
  }
  deleteFollower(follower: IFollower) {
    this.friendsService.delete(this.getUser().id, follower.id)
  }
  deleteFollowing(follower: IFollower) {
    this.friendsService.delete(follower.id ,this.getUser().id)
  }


  goProfile(follower: IFollower) {
    this.router.navigate(["/petgram/profile_view"], { state: { user: follower.id, onload: true } });
  }

}
