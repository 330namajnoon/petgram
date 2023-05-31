import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileViewRoutingModule } from './profile-view-routing.module';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { LoadingComponent } from '../loading/loading.component';
import { FollowerComponent } from './follower/follower.component';
import { MediaGalleryComponent } from './media-gallery/media-gallery.component';
import { StoryComponent } from './media-gallery/story/story.component';
import { PetDataComponent } from './media-gallery/pet-data/pet-data.component';


@NgModule({
  declarations: [
    ProfileViewComponent,
    LoadingComponent,
    FollowerComponent,
    MediaGalleryComponent,
    StoryComponent,
    PetDataComponent,

  ],
  imports: [
    CommonModule,
    ProfileViewRoutingModule
  ]
})
export class ProfileViewModule { }
