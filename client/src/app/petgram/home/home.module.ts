import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  declarations: [
    HomeComponent,
    StoryComponent,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
