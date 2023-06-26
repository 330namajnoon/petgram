import { IPet } from 'src/interfaces/IPet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from './app.service';
import { IUser } from 'src/interfaces/IUser';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileConfigService extends AppServiceEx {

  constructor(private http: HttpClient,appS:AppService) {
    super(appS);
  }

  updateData(newData:any):Promise<IUser>  {
    return new Promise((resolve)=> {
      this.http.post<IUser>(`${this.getURL()}/updateData`,newData).subscribe(res => {
        resolve(res);
      });
    })

  };

  getUsers():Promise<IUser[]>{
    return new Promise((resolve)=> {
      this.http.get<IUser[]>(`${this.getURL()}/getUsers`).subscribe(res => {
        resolve(res);
      })
    })
  }


}
