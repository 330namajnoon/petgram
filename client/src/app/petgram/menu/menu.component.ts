import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  containerStyle = {
    'height': '50px',
    'top':`${window.innerHeight-50}px`
  }
  options = [
    {name:"home",url:"/home"}
  ]
}
