import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileViewRoutingModule } from './profile-view-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';


@NgModule({
  declarations: [
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    ProfileViewRoutingModule
  ]
})
export class ProfileViewModule { }
