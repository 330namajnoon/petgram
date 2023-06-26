import { Injectable } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IStory } from 'src/interfaces/IStory';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StorysService extends AppServiceEx {
  private newStory!:IStory;
  private newFile!:File;
  private contexts:any = {};
  constructor(appService:AppService,private http:HttpClient) {
    super(appService);

  }

  get(name:string):any {
    return this.contexts[name];
  }
  set(name:string,value:any):void {
    this.contexts[name] = value;
  }

  setNewStory(newStory:IStory,file:File):void {
    this.newStory = newStory;
    this.newFile = file;
  }

  saveStory():Promise<{error:any,data:IStory}> {
    return new Promise((resolve)=> {

      this.newStory.url = this.getURL();
      const formData = new FormData();
      formData.append("story",JSON.stringify(this.newStory));
      formData.append("file",this.newFile);
      console.log(this.newStory)
      this.http.post<{error:any,data:IStory}>(`${this.getURL()}/saveStory`,formData).subscribe((res)=> {
        resolve(res);
      })
    })
  }
}
