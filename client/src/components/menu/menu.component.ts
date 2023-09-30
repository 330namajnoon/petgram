import { Component } from '@angular/core';
import { MenuService } from 'src/services/menu.service';
import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent extends AppServiceEx {
  containerStyle = {
    height: '50px',
    top: `${window.innerHeight - 50}px`,
  };
  constructor(
    appService: AppService,
    public menuService: MenuService
  ) {
    super(appService);
  }
}
