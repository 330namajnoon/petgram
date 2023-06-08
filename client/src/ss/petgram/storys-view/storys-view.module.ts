import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorysViewRoutingModule } from './storys-view-routing.module';
import { StorysViewComponent } from './storys-view/storys-view.component';
import { StoryComponent } from './storys-view/story/story.component';
import { CommentsComponent } from './storys-view/comments/comments.component';
import { MsgComponent } from './storys-view/comments/msg/msg.component';
@NgModule({
  declarations: [
    StorysViewComponent,
    StoryComponent,
    CommentsComponent,
    MsgComponent
  ],
  imports: [
    CommonModule,
    StorysViewRoutingModule
  ]
})
export class StorysViewModule { }
