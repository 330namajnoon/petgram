import { httpClient } from 'src/assets/ts/httpClient';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService extends AppServiceEx {

  mascotUrl: string = ""
  constructor(private httpClient: HttpClient,appS:AppService ) {
    super(appS);
  }




}
