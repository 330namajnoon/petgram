import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileViewRoutingModule } from 'src/routers/profile-view-routing.module';
import { ProfileViewComponent } from 'src/components/profile-view/profile-view/profile-view.component';
import { LoadingComponent } from 'src/components/loading/loading.component';
import { FollowerComponent } from 'src/components/profile-view/follower/follower.component';
import { MediaGalleryComponent } from 'src/components/profile-view/media-gallery/media-gallery.component';
import { StoryComponent } from 'src/components/profile-view/media-gallery/story/story.component';
import { PetDataComponent } from 'src/components/profile-view/media-gallery/pet-data/pet-data.component';


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
  ],
  exports:[
    FollowerComponent
  ]
})
export class ProfileViewModule { }
