import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IFollower } from 'src/interfaces/IFollower';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent extends AppServiceEx {
  followers: IFollower[] = [];
  follows: IFollower[] = [];
  dataSource;
  displayedColumns: string[] = ['follower', 'action'];



  constructor(appS: AppService) {
    super(appS)
    for (let index = 0; index < 40; index++) {
      this.followers.push(
        { id: index + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'accepted' },
        { id: (index + 1) + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'pending' },
      );
      index++
      this.follows.push(
        { id: index + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'accepted' },
        { id: (index + 1) + '', avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'pending' },
      );
    }
    this.dataSource = new MatTableDataSource(this.followers);
  }
  acceptFollower(follower: IFollower) {
    follower.status = 'accepted'
  }

  deleteFollower(follower: IFollower) {
    /*
       0: { id: "1", avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'accepted' },
       1: { id: "2", avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'accepted' },
       2: { id: "3", avatar: 'assets/images/mascotas.jpg', lastName: 'Gonzalez', name: 'Alba', status: 'accepted' },

       0: "1"
       1: "2"
       2: "3"

       indexOf("2")

       0: "1" === "2" ? false
       1: "2" === "2" ? 1
       2: "3"
    */
    var removeIndex = this.followers.map(item => item.id).indexOf(follower.id);
    ~removeIndex && this.followers.splice(removeIndex, 1);
  }

}
