import { Component, OnInit } from '@angular/core';

import { AppService } from 'src/services/app.service';
import { IStoryLink } from 'src/interfaces/IStoryLink';

import { HomeService } from 'src/services/home.service';
import { ActivatedRoute,NavigationEnd,Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AppServiceEx implements OnInit {
  constructor(
    private router:Router,
    appService: AppService,
    private homeService: HomeService,
    private actRouter:ActivatedRoute
  ) {
    super(appService)
    this.router.events.subscribe(event => {
      if(location.pathname == "/petgram") {
        this.setLoading(false);
      }
    })
    // this.homeService.set('setScroll', this.setScroll.bind(this));
  }
  device: string = this.getDevice();
  storysStyle = { height: `${window.innerHeight - (this.getDevice() == 'container_mobile' ? 55 : 80)}px` };


  async ngOnInit() {
    this.homeService.downloadStorys();
  }

  getStorysData(): IStoryLink[] {
    return this.homeService.getStorysLink();
  }

}
