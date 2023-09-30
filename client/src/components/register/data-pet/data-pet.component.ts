import { IPet } from 'src/interfaces/IPet';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class DataPetComponent extends AppServiceEx implements OnInit{
  ctrl = inject(RegisterController);
  form: FormGroup = this.ctrl.formDataPet;
  types:{id:number;type:string}[] = [];
  races:{id:number;race:string}[] = [];
  checkboxs:boolean[] = [false,false];
  constructor(private router: Router, private registerS: RegisterService,appS:AppService,private acRouter:ActivatedRoute) {
    super(appS);
  }

  getTypes():{id:number;type:string}[] {
    return this.types;
  }

  getRaces():{id:number;race:string}[] {
    return this.races;
  }

  goNext() {
    this.form.markAllAsTouched();
    if (this.form.valid){
      let name: string  = this.form.get('name')?.value;
      let birthDay = this.form.get('birthDay')?.value;
      let gender = this.form.get('gender')?.value;
      let race = parseInt(this.form.get('race')?.value);
      let type = parseInt(this.form.get('type')?.value);
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

  ngOnInit(): void {
    this.acRouter.params.subscribe(prms => {
      this.downloadtypes();
    })
  }

  async downloadtypes() {
    this.setLoading(true);
    let res = await this.registerS.getTypes();
    this.setLoading(false);
    if (!res.error) {
      this.types = res.data;
    } else {
      this.router.navigate(["/error"], { state: { error: res.error } });
    }
  }

  async downloadRaces(event:Event) {
    let select = event.target as HTMLSelectElement;
    if(select.value !== "") {
      this.setLoading(true);
      let res = await this.registerS.getRaces(parseInt(select.value));
      this.setLoading(false);
      if (!res.error) {
        this.races = res.data;
      } else {
        this.router.navigate(["/error"], { state: { error: res.error } });
      }
    }
  }

  checked(n:number) {
    this.checkboxs[n] ? this.checkboxs[n] = false : this.checkboxs[n] = true;
  }
}
