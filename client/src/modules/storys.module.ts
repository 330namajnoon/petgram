import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StorysRoutingModule } from 'src/routers/storys-routing.module';
import { StorysComponent } from 'src/components/storys/storys/storys.component';
import { NewStoryComponent } from 'src/components/storys/new-story/new-story.component';
import { StorysViewModule } from './storys-view.module';
@NgModule({
  declarations: [
    StorysComponent,
    NewStoryComponent,

  ],
  imports: [
    CommonModule,
    StorysRoutingModule,
    ReactiveFormsModule,
    StorysViewModule
  ]
})
export class StorysModule { }
