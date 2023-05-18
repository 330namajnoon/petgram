import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  options = [
    {name:"home",url:"/home"},
    {name:"cycle",url:"/storys"}
  ]
  select:string = this.options[0].name;
  constructor() { }

  setPage(name:string,url:string) {
    let a = document.createElement("a");
    a.href = "/petgram" + url;
    this.select = name;
    a.click();
  }

}
