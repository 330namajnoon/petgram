import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.scss']
})
export class FollowerComponent {
  @Input()device!:string;
  @Input()userName!:string;
  @Input()user!:string;
  @Input()Image!:string;

}
