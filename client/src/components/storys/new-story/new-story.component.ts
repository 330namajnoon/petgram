import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import { IStory } from 'src/interfaces/IStory';
import { StorysService } from 'src/services/storys.service';
@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.scss']
})
export class NewStoryComponent extends AppServiceEx {
  group = new FormGroup({
    petName: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required,Validators.min(10)]),
  });
  private file!:File;
  step:number = 0;
  fileUrl!:string;
  fileType!:string;
  videoStatus:boolean = false;
  @ViewChild("video")video!:ElementRef;
  constructor(appService:AppService,private router:Router,private storyS:StorysService) {
    super(appService);

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        let state = router.getCurrentNavigation()?.extras.state;
        if(state) {
          let data = state as {file:File};
          this.file = data.file;
          this.fileLoader(this.file);
        }
      }
    })
  }

  fileLoader(file:File):void {
    const fileReader:FileReader = new FileReader();
    fileReader.addEventListener("progress",({total,loaded})=> {
      let _loaded:any = ((100/total)*loaded).toFixed(0);
      console.log(_loaded);

    })
    fileReader.addEventListener("load",()=> {
      if(typeof fileReader.result == "string") {
        this.fileType = file.type.split("/")[1];
        this.fileUrl = fileReader.result;

      }
    })
    fileReader.readAsDataURL(file);
  }

  getFileURL():string {
    return this.fileUrl;
  }

  getFileType():string {
    return this.fileType;
  }

  getStep():number {
    return this.step;
  }

  next():void {
    if(this.step < 1) {
      this.step = this.step + 1;


    }
  }
  back():void {
    this.step--;
  }

  getProfileView():void {
    let url: string[] = location.pathname.split("/").slice(1, location.pathname.split("/").length);
    url[0] = "/" + url[0];
    url = url.slice(0,-2);
    this.router.navigate(url, { state: { user:this.getUser().id} });
  }

  getStorysView():void {
    if(this.group.valid) {
      let pet:string = this.group.get("petName")?.value || "";
      let description:string = this.group.get("description")?.value || "";
      let storys:IStory[] = [{
        id:"",
        comments:[],
        description,
        pet,
        fullName:this.getUser().name + " " + this.getUser().lastName,
        likes:[],
        views:[],
        profileImage:this.getUser().image,
        type:this.fileType,
        url:this.getFileURL(),
        user_id:this.getUser().id
      }];
      this.storyS.setNewStory(storys[0],this.file);
      this.storyS.get("setStorySaveDisplay")(true);
      let url:string[] = location.pathname.split("/").slice(1,location.pathname.split("/").length);
      url[0] = "/"+url[0];
      url = url.slice(0,-1);
      url.push("storys_view");
      this.router.navigate(url,{state:{storys,index:0}});
    }
  }


}
