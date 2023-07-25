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

  getLanguage():string {
    return this.language.language;
  }

  getCoutrys():Promise<IHTTPResponse<{id:number;country:string}[]>> {
    return new Promise((resolve)=> {
      this.http.post<IHTTPResponse<{id:number;country:string}[]>>(`${this.getURL()}/countrys`,{language:this.getLanguage() || this.getUser().language}).subscribe(res => {
        resolve(res)
      })
    })
  }

  getTypes():Promise<IHTTPResponse<{id:number;type:string}[]>> {
    return new Promise((resolve)=> {
      this.http.post<IHTTPResponse<{id:number;type:string}[]>>(`${this.getURL()}/types`,{language:this.getLanguage()}).subscribe(res => {
        resolve(res)
      })
    })
  }
  getRaces(id:number):Promise<IHTTPResponse<{id:number;race:string}[]>> {
    return new Promise((resolve)=> {
      this.http.post<IHTTPResponse<{id:number;race:string}[]>>(`${this.getURL()}/races`,{id,language:this.getLanguage()}).subscribe(res => {
        resolve(res)
      })
    })
  }


}




