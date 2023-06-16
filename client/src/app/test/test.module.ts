import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { TestRoutingModule } from './test-routing.module';
import { VideoListComponent } from '../video-list/video-list.component';

@NgModule({
  declarations: [VideoPlayerComponent,VideoListComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ],
  exports:[
    VideoPlayerComponent
  ]
})
export class TestModule { }
