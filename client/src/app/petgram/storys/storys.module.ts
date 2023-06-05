import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StorysRoutingModule } from './storys-routing.module';
import { StorysComponent } from './storys/storys.component';
import { NewStoryComponent } from './new-story/new-story.component';


@NgModule({
  declarations: [
    StorysComponent,
    NewStoryComponent
  ],
  imports: [
    CommonModule,
    StorysRoutingModule,
    ReactiveFormsModule
  ]
})
export class StorysModule { }
