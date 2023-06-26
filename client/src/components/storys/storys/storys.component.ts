import { async } from '@angular/core/testing';
import { Component,ViewChild,ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { FormControl,FormGroup } from '@angular/forms';
import { StorysService } from 'src/services/storys.service';
import { ProfileViewService } from 'src/services/profile-view.service';
@Component({
  selector: 'app-storys',
  templateUrl: './storys.component.html',
  styleUrls: ['./storys.component.scss']
})
export class StorysComponent extends AppServiceEx {
  @ViewChild("file")file!:ElementRef;
  fileSelected:boolean = true;
  storySaveDisplay:boolean = false;
  constructor(private profileVS:ProfileViewService,appService:AppService,private router:Router,private storyS:StorysService,private acRouter:ActivatedRoute) {
    super(appService)
    this.acRouter.params.subscribe(res => {
      console.log()
      let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
      url[0] = "/"+url[0];
      url.push("view");
      this.router.navigate(url,{state:{user:this.getUser().id,onload:this.profileVS.getProfileData()? this.profileVS.getProfileData().id == this.getUser().id ? false : true : true}});
      this.storyS.set("setStorySaveDisplay",this.setStorySaveDisplay.bind(this));
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
      this.storyS.get("setStorySaveDisplay")(false);
      this.getUser().storys.unshift({pet_id:res.data.pet,story_id:res.data.id});
      let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
      url[0] = "/"+url[0];
      url = url.slice(0,-1);
      this.router.navigate(url,{state:{user:this.getUser().id,onload:true}});
    }
  }
}
