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
 users: IUser[] = [];
 optionInputMethod:any;
  constructor(private http: HttpClient,appS:AppService) {
    super(appS);
  }


  setOptionInputMethod(val:any) {
    this.optionInputMethod = val;
  }



}
