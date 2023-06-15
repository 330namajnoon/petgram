import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorysViewRoutingModule } from '../routers/storys-view-routing.module';
import { StorysViewComponent } from 'src/components/storys-view/storys-view.component';
import { StoryComponent } from 'src/components/storys-view/story/story.component';
import { CommentsComponent } from 'src/components/storys-view/comments/comments.component';
import { MsgComponent } from 'src/components/storys-view/comments/msg/msg.component';
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
