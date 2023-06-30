import { Component, Input } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent extends AppServiceEx {
  @Input()name!:string;
  @Input()value!:string;
  @Input()route!:string;
  inputD:boolean = true;
  constructor(appS:AppService,private profileCS:ProfileConfigService) {
    super(appS);
  }

  setInputD(val:boolean):void {
    this.inputD = val;
    if(!val) {
      setTimeout(()=> {
        this.profileCS.setOptionInputMethod(this.setInputD.bind(this));
      },100);
    } else {
      this.profileCS.setOptionInputMethod(null);

    }
  }
}
