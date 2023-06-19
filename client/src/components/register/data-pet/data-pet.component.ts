import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterController } from '../register.controller';

@Component({
  selector: 'app-data-pet',
  templateUrl: './data-pet.component.html',
  styleUrls: ['./data-pet.component.scss'],
})
export class DataPetComponent {
  ctrl = inject(RegisterController);
  form = this.ctrl.formDataPet;

  races = [
    { key: 1, label: 'Shitzu' },
    { key: 2, label: 'Golden Retriever' },
    { key: 3, label: 'pitbull' },
    { key: 4, label: 'podler' },
  ];

  constructor(private router: Router) { }

  goNext() {
    this.form.markAllAsTouched();
    if (this.form.valid)
      this.router.navigateByUrl('/signup/image-pet');
  }
}
