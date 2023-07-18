import { IPet } from 'src/interfaces/IPet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from './app.service';
import { IUser } from 'src/interfaces/IUser';
import { Observable } from 'rxjs';
import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';



@Injectable({
  providedIn: 'root'
})
export class ProfileConfigService extends AppServiceEx {
 users: IUser[] = [];
 optionInputMethod:any;
  constructor(private http: HttpClient,appS:AppService) {
    super(appS);
  }


  setOptionInputMethod(val:any) {
    this.optionInputMethod = val;
  }

  updateImage(id:string,file:File):Promise<IHTTPResponse<string>> {
    return new Promise((resolve)=> {
      const formData = new FormData();
      formData.append("id",id);
      formData.append("file",file);
      this.http.post<IHTTPResponse<string>>(this.getURL()+"/imageUpdate",formData).subscribe(res => {
        resolve(res)
      })
    })
  }




  deleteById(id: string): void {
    this.http.delete(`${this.getURL()}/${id}`);
  }

  async save(user: IUser): Promise<void> {
    this.http.post(this.getURL(), user)
  }


  

}




