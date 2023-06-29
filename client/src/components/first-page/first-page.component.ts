import { ActivatedRoute, Router } from '@angular/router';
import { IHTTPResponse } from './../../interfaces/IHTTPResponse';
import { Component, OnInit } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';
import { RegisterService } from 'src/services/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent extends AppServiceEx implements OnInit {
  group = new FormGroup({
    language:new FormControl("",[Validators.required]),
  })
  languages!:string[];
  constructor(appS:AppService,private registerS:RegisterService,private router:Router,private acRouter:ActivatedRoute) {
    super(appS);
  }

  ngOnInit(): void {
      this.acRouter.params.subscribe(prms => {
        this.downloadLanguages();
      })
  }

  async downloadLanguages() {
    this.setLoading(true);
    const res = await this.registerS.getLenguages();
    this.setLoading(false);
    if(!res.error) {
      this.setLanguages(res.data);
    }else {
      this.router.navigate(["/error"],{state:{error:res.error}});
    }
  }

  setLanguages(languages:string[]) {
    this.languages = languages;
  }

  getLanguages():string[] {
    return this.languages;
  }

  getSignupPage():void {
    this.group.markAllAsTouched();
    if(this.group.valid) {
      const select = document.getElementById("language") as HTMLSelectElement;
      this.registerS.setLanguage(select.value);
      this.router.navigate(["/signup"]);
    }
  }

}
