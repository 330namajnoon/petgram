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
 users: IUser[] = []
  constructor(private http: HttpClient,appS:AppService) {
    super(appS);
  }

  // updateData(newData:any):Promise<IUser>  {
  //   return new Promise((resolve)=> {
  //     this.http.post<IUser>(`${this.getURL()}/updateData`,newData).subscribe(res => {
  //       resolve(res);
  //     });
  //   })

  // };

  updateArrayElements(elements: IUser[]): Observable<IUser[]>{
    return this.http.post<IUser[]>(`${this.getUser()}/updateArray`, elements)
  }

  getUsers():Promise<IUser[]>{
    return new Promise((resolve)=> {
      this.http.get<IUser[]>(`${this.getURL()}/getUsers`).subscribe(res => {
        resolve(res);
      })
    })
  }

  deleteById(id: string): void {
    this.http.delete(`${this.getURL()}/${id}`);
  }

  async save(user: IUser): Promise<void> {
    (await this.getUsers()).push(user);
  }

}
