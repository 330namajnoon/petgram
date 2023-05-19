import { Component,OnInit } from '@angular/core';
import { AppService } from './app.service';
import { httpClient } from './httpClient';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private appService:AppService) {

  }

  async ngOnInit() {
    console.log("hola")
    console.log(await httpClient("POST",this.appService.URL+"/downloadStorys",[],(loaded,total)=> {
      console.log(loaded/total*100)
    }))
  }
}
