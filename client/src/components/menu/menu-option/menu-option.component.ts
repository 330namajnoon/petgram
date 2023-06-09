import { Component,Input } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';
import { MenuService } from 'src/services/menu.service';
@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.scss']
})
export class MenuOptionComponent extends AppServiceEx {
  @Input()name!:string;
  @Input()url!:string;
  constructor(appService:AppService,public menuService:MenuService){
    super(appService);
  }
  getSelectVal():string {
    return this.menuService.select;
  }
  setPage(name:string,url:string):void {
    this.menuService.setPage(name,url);
  }
}
