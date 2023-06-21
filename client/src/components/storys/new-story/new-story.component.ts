import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppService } from 'src/services/app.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';

@Component({
  selector: 'app-new-story',
  templateUrl: './new-story.component.html',
  styleUrls: ['./new-story.component.scss']
})
export class NewStoryComponent extends AppServiceEx {

  private file!:File;
  step:number = 0;
  fileUrl!:string;
  fileType!:string;
  videoStatus:boolean = false;
  @ViewChild("video")video!:ElementRef;
  constructor(appService:AppService,private router:Router) {
    super(appService);
    console.log("ñsvj")
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
    this.step += 1;
    console.log(this.step)
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


}
