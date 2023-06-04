import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-password-validator',
  templateUrl: './password-validator.component.html',
  styleUrls: ['./password-validator.component.css']
})
export class PasswordValidatorComponent implements OnInit {
  @Input() control: AbstractControl | null | undefined;

  constructor() { }

  ngOnInit() {
  }

}
