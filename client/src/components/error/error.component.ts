import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  error!:string;
  constructor(private router:Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        const state = router.getCurrentNavigation()?.extras.state;
        const data = state as {error:string};
        this.error = data.error;
      }
    })
  }
}
