import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  // URL:string = 'http://localhost:4000';
  // socket = io(this.URL);
  constructor() { }
}
