import { IPet } from 'src/interfaces/IPet';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterController } from '../register.controller';
import { FormGroup } from '@angular/forms';
import { RegisterService } from 'src/services/register.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-data-pet',
  templateUrl: './data-pet.component.html',
  styleUrls: ['./data-pet.component.scss'],
})
export class DataPetComponent extends AppServiceEx{
  ctrl = inject(RegisterController);
  form: FormGroup = this.ctrl.formDataPet;

  races = [
    { key: 1, label: 'Shitzu' },
    { key: 2, label: 'Golden Retriever' },
    { key: 3, label: 'pitbull' },
    { key: 4, label: 'podler' },
  ];

  constructor(private router: Router, private registerS: RegisterService,appS:AppService) {
    super(appS);
   }

  goNext() {
    this.form.markAllAsTouched();
    if (this.form.valid){
      let name: string  = this.form.get('name')?.value;
      let birthDay = this.form.get('birthDay')?.value;
      let gender = this.form.get('gender')?.value;
      let race = this.form.get('race')?.value;
      let type = this.form.get('type')?.value;
      let description = this.form.get('description')?.value;
      const newPet:IPet = {
        id:'',
        name,
        birthDay,
        gender,
        race,
        type,
        description,
        user_id:'',
      }
      this.registerS.setNewDataPet(newPet)
      this.router.navigateByUrl('/signup/image-pet');
    }else {
      alert(this.language.getWord("missing_data_in_the_form"));
    }

  }
}
