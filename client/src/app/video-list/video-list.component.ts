import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent {
  @Output()play_pause = new EventEmitter();


  playPause():boolean {
    return true
  }
}
