import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from 'src/components/friends/friends.component';
import { FriendsRoutingModule } from 'src/routers/friends-routing.module';

@NgModule({
  declarations: [
    FriendsComponent
  ],
  imports: [
    CommonModule,
    FriendsRoutingModule
  ],

})
export class FriendsModule { }
