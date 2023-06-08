import { Component } from '@angular/core';
import { MenuService } from 'src/services/menu.service';
import { AppService } from 'src/services/app.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  containerStyle = {
    height: '50px',
    top: `${window.innerHeight - 50}px`,
  };
  constructor(
    private appService: AppService,
    public menuService: MenuService
  ) {}
  getDevice(): string {
    return this.appService.getDevice();
  }
}
