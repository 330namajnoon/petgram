import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-pet',
  templateUrl: './data-pet.component.html',
  styleUrls: ['./data-pet.component.scss'],
})
export class DataPetComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    race: new FormControl('', Validators.required),
    description: new FormControl(''),
    privacyPolicy: new FormControl('', Validators.required),
    termsAndConditions: new FormControl('', Validators.required),
  });

  races = [
    { key: 1, label: 'Shitzu' },
    { key: 2, label: 'Golden Retriever' },
    { key: 3, label: 'pitbull' },
    { key: 4, label: 'podler' },
  ];

  constructor(private router: Router) { }

  goNext() {
    this.form.markAllAsTouched();
    this.router.navigateByUrl('/signup/image-pet');
  }
}
