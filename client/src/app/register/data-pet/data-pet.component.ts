import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    description: new FormControl('', Validators.required),
    privacyPolicy: new FormControl('', Validators.required),
    termsAndConditions: new FormControl('', Validators.required),
  });

  races = [
    { key: 1, label: 'Shitzu' },
    { key: 2, label: 'Golden Retriever' },
    { key: 3, label: 'pitbull' },
    { key: 4, label: 'podler' },
  ];
}
