import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { TestRoutingModule } from './test-routing.module';


@NgModule({
  declarations: [VideoPlayerComponent],
  imports: [
    CommonModule,
    TestRoutingModule
  ]
})
export class TestModule { }
