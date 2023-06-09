import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { __values } from 'tslib';
import { RegisterService } from 'src/services/register.service';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss'],
})
export class DataUserComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',  [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
    confirmPassword: new FormControl('',  [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
    description: new FormControl('', Validators.required),
  });

  promise() {
    if(this.form.valid) {
      this.registerS.setScrollPromise(true);
    }
  }

  constructor(private router: Router,private registerS:RegisterService) {

  }




}
