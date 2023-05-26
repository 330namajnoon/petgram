import { Component,Input } from '@angular/core';
import { IStory } from 'src/app/interfaces/IStory';
@Component({
  selector: 'app-media-gallery',
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent {
  @Input()display!:boolean;
  @Input()user!:boolean;
  @Input()storyId!:string;
  story!:IStory;

}
