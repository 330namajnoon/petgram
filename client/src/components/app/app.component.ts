import { Component,OnInit } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AppServiceEx implements OnInit {

  constructor(appService:AppService) {
    super(appService)
  }

  ngOnInit(): void {
  }

}
