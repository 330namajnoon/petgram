import { Component,Input } from '@angular/core';
import { MenuService } from '../menu.service';
@Component({
  selector: 'app-menu-option',
  templateUrl: './menu-option.component.html',
  styleUrls: ['./menu-option.component.scss']
})
export class MenuOptionComponent {
  @Input()name!:string;
  @Input()url!:string;
  constructor(public menuService:MenuService){}
}
