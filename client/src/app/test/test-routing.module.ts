import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { VideoListComponent } from '../video-list/video-list.component';

const routes: Routes = [
  {path:"",component:VideoListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }
