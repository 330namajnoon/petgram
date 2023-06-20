import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorysViewService {
  private videoPlayerControl!:any;
  constructor() { }

  getVideoPlayerControl():any {
    return this.videoPlayerControl;
  }
  setideoPlayerControl(control:any):void {
    this.videoPlayerControl = control;
  }
}
