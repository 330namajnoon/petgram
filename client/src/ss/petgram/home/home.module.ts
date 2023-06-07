import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';
import { CommentsComponent } from './comments/comments.component';
import { MsgComponent } from './comments/msg/msg.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    HomeComponent,
    StoryComponent,
    CommentsComponent,
    MsgComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
