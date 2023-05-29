import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { IStory } from 'src/app/interfaces/IStory';

@Component({
  selector: 'app-storys-view',
  templateUrl: './storys-view.component.html',
  styleUrls: ['./storys-view.component.scss']
})
export class StorysViewComponent implements OnInit {
  storys!:IStory[];
  constructor(private appS:AppService,private router:ActivatedRoute) {}
  ngOnInit(): void {
    // console.log(this.router.snapshot.data)
  }
  getDevice():string {
    return this.appS.getDevice();
  }
}
