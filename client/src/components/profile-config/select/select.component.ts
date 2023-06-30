import { Component, ElementRef, Input ,ViewChild,AfterViewInit} from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';
import { ISelectOption } from 'src/interfaces/ISelectOption';
import { ProfileConfigService } from 'src/services/profile-config.service';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends AppServiceEx implements AfterViewInit {
  dataContainerStyle:any = [
    {
      height:"auto"
    },
    {
      height:"0px"
    }
  ]
  dataContainerStyleNumber:number = 0;
  @Input()selectName!:string;
  @Input()options!:ISelectOption[];
  constructor(appS:AppService,private profileCS:ProfileConfigService) {
    super(appS);
  }

  ngAfterViewInit(): void {
    const container = document.getElementById("container") as HTMLDivElement;
    container.addEventListener("click",(e)=> {
      let t = e.target as HTMLElement;

      if(t.id == "data_container") {
        this.disabledInput();
      }
    })
  }

  open_close(e:Event) {
    let event = e.target as HTMLInputElement;
    event.checked ? this.dataContainerStyleNumber = 1 : this.dataContainerStyleNumber = 0;
  }



  disabledInput() {
    if(this.profileCS.optionInputMethod) {
      this.profileCS.optionInputMethod(true);
    }
  }


}
