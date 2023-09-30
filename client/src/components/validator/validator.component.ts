import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.css']
})
export class ValidatorComponent extends AppServiceEx implements OnInit  {
  @Input() control: AbstractControl | null | undefined;

  constructor(appS:AppService) {
    super(appS);
  }

  ngOnInit() {
  }

}
