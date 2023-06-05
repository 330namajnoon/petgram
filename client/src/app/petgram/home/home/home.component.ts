import { Component, OnInit } from '@angular/core';
import { animation } from 'src/app/animation';
import { AppService } from 'src/app/app.service';
import { IStoryData } from 'src/app/interfaces/IStoryData';
import { httpClient } from 'src/app/httpClient';
import { HomeService } from '../home.service';
import { ActivatedRoute } from '@angular/router';
import { AppServiceEx } from 'src/app/extends/AppServiceEx';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends AppServiceEx implements OnInit {
  constructor(
    appService: AppService,
    private homeService: HomeService,
    private actRouter:ActivatedRoute
  ) {
    super(appService)
    this.homeService.set('setScroll', this.setScroll.bind(this));
  }
  device: string = this.getDevice();
  storysStyle = { height: `${window.innerHeight - 80}px` };
  setScroll(id: number, distancia: number): void {
    let container: any = document.getElementById('home_storys');
    let frame = 40;
    if (Math.abs(distancia) > 100) {

      if (distancia < 0 && document.getElementById('story' + (id + 1))) {
        let p2: number =
          (container.scrollHeight / this.homeService.getStorysData().length) *
          (id + 1);
        animation((f) => {
          container.scrollTop += frame;
          if (container.scrollTop >= p2) {
            container.scrollTop = p2;
            this.homeService.get(`story${id + 1}`).downloadStory();
            return false;
          }
          return true;
        });
      }
      if (distancia > 0 && document.getElementById('story' + (id - 1))) {
        let p2: number =
          (container.scrollHeight / this.homeService.getStorysData().length) *
          (id - 1);
        animation((f) => {
          container.scrollTop -= frame;
          if (container.scrollTop <= p2) {
            container.scrollTop = p2;
            this.homeService.get(`story${id - 1}`).downloadStory();
            return false;
          }
          return true;
        });
      }
    } else {
      let p2: number =
        (container.scrollHeight / this.homeService.getStorysData().length) * id;
      container.scrollTop = p2;
    }
  }


  async ngOnInit() {
    this.homeService.downloadStorys();
  }

  getStorysData(): IStoryData[] {
    return this.homeService.getStorysData();
  }

}
