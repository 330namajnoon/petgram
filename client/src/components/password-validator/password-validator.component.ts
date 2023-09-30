import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.css']
})
export class PasswordValidatorComponent extends AppServiceEx implements OnInit {
  @Input() control: AbstractControl | null | undefined;

  constructor(appS:AppService) {
    super(appS);
  }

  ngOnInit() {
  }

}
