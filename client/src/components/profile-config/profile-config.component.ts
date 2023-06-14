import { Component, OnInit } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent extends AppServiceEx implements OnInit{
  
  constructor(appService: AppService){
    super(appService)


  }

  ngOnInit(): void {
    console.log(this.getUser());
     
  }

}
