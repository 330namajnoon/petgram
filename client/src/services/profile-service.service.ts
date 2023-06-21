import { httpClient } from 'src/assets/ts/httpClient';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {

  mascotUrl: string = ""
  constructor(private httpClient: HttpClient ) {}


}
