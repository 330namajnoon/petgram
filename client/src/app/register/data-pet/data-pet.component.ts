import { Component } from '@angular/core';

@Component({
  selector: 'app-data-pet',
  templateUrl: './data-pet.component.html',
  styleUrls: ['./data-pet.component.scss'],
})
export class DataPetComponent {
  races = [
    { key: 1, label: 'Shitzu' },
    { key: 2, label: 'Golden Retriever' },
    { key: 3, label: 'pitbull' },
    { key: 4, label: 'podler' },
  ];
}
