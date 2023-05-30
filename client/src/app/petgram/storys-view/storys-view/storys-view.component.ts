import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { IStory } from 'src/app/interfaces/IStory';

@Component({
  selector: 'app-storys-view',
  templateUrl: './storys-view.component.html',
  styleUrls: ['./storys-view.component.scss']
})
export class StorysViewComponent {
  storys!:IStory[];
  constructor(private appS:AppService,private router:Router) {
    let state = this.router.getCurrentNavigation()?.extras.state;
    if(state) {
      let data = state as {data:number[]};
      console.log(data);
    }
  }

  getDevice():string {
    return this.appS.getDevice();
  }
}
