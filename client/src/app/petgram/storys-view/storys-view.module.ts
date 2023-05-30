import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorysViewRoutingModule } from './storys-view-routing.module';
import { StorysViewComponent } from './storys-view/storys-view.component';
import { StoryComponent } from './storys-view/story/story.component';


@NgModule({
  declarations: [
    StorysViewComponent,
    StoryComponent
  ],
  imports: [
    CommonModule,
    StorysViewRoutingModule
  ]
})
export class StorysViewModule { }
