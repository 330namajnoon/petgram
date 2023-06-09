import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsComponent } from 'src/components/friends/friends.component';
import { FriendsRoutingModule } from 'src/routers/friends-routing.module';
import { ProfileViewModule } from './profile-view.module';
import { MaterialAllModules } from './material.module';

@NgModule({
  declarations: [
    FriendsComponent,

  ],
  imports: [
    CommonModule,
    FriendsRoutingModule,
    ProfileViewModule,
    MaterialAllModules,
  ],

})
export class FriendsModule { }
