import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from '../routers/home-routing.module';
import { HomeComponent } from '../components/home/home/home.component';
import { StoryComponent } from '../components/home/story/story.component';
import { CommentsComponent } from '../components/home/comments/comments.component';
import { MsgComponent } from '../components/home/comments/msg/msg.component';
import { ReactiveFormsModule } from "@angular/forms";
import { VideoPlayerComponent } from 'src/components/home/video-player/video-player.component';

@NgModule({
  declarations: [
    HomeComponent,
    StoryComponent,
    CommentsComponent,
    MsgComponent,
    VideoPlayerComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
