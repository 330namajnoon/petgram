import { async } from '@angular/core/testing';
import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { FormControl,FormGroup } from '@angular/forms';
import { StorysService } from 'src/services/storys.service';
@Component({
  selector: 'app-storys',
  templateUrl: './storys.component.html',
  styleUrls: ['./storys.component.scss']
})
export class StorysComponent extends AppServiceEx {
  @ViewChild("file")file!:ElementRef;
  fileSelected:boolean = true;
  storySaveDisplay:boolean = false;
  constructor(appService:AppService,private router:Router,private storyS:StorysService) {
    super(appService)
    let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
    url[0] = "/"+url[0];
    url.push("view");
    this.router.navigate(url,{state:{user:this.getUser().id}});
    this.storyS.set("setStorySaveDisplay",this.setStorySaveDisplay.bind(this));
    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
      }
    })
  }

  formGroup = new FormGroup({
    file: new FormControl(),
  })
  clickFile() {
    if(this.file) {
      let file:HTMLElement = this.file.nativeElement as HTMLElement
      file.click();
    }
  }
  uploadFile(event:Event):void {
    if(this.formGroup.get("file")) {
      if(event.target) {
        let file = event.target as HTMLInputElement;
        let medya = file.files?.item(0);
        let type = medya?.type.split("/")[1];
        console.log(type);
        if(type == "jpeg" || type == "png" || type == "mp4") {
          let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
          url[0] = "/"+url[0];
          url.push("new");
          this.fileSelected = false;
          this.router.navigate(url,{state:{file:medya}});
        }else {
          console.log("file type");
        }
      }
    }
  }

  setStorySaveDisplay(value:boolean) {
    this.storySaveDisplay = value;
  }
  getStorySaveDisplay():boolean {
    return this.storySaveDisplay;
  }

  async saveStory() {
    const res = await this.storyS.saveStory();
    if(res.error) {

    }else {
      this.getUser().storys.unshift({pet_id:res.data.pet,story_id:res.data.id});
      this.router.navigate(["/petgram","storys"]);
    }
  }
}
