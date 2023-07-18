
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';
import { IHTTPResponse } from 'src/interfaces/IHTTPResponse';
import { IStory } from 'src/interfaces/IStory';
import { IStoryAdress } from 'src/interfaces/IStoryAdress';
import { NavigationEnd, Router } from '@angular/router';
import { AbstractControl, FormControl, Validators ,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.scss']
})
export class DeletePetComponent  extends AppServiceEx implements OnInit{

 isPasswordCorrect: boolean = false;
 enteredPassword: string = "";
  petName!:string;
  petId!:string;
 constructor(appService: AppService ,private proConfigService : ProfileConfigService,private http:HttpClient,private router:Router){
   super(appService)

    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd) {
        let state = this.router.getCurrentNavigation()?.extras.state;
        if(state) {
          let pet_data = state as {petId:string,petName:string};
          this.petId = pet_data.petId;
          this.petName = pet_data.petName;
        }
      }
    })
    
 }


 ngOnInit(): void {
  
 }
 passForm = new FormGroup({
  password: new FormControl('', [Validators.required]),
    passwordConfirm: new FormControl('', [Validators.required])
  }, {validators: this.passwordConfirmValidator}  );
 
 passwordConfirmValidator(control: AbstractControl) {
  if (control.get('password')?.value === control.get('passwordConfirm')?.value)
    return null; // si son iguales no hay error
  else
    return {'confirmError': true}; // si son distintas sí hay error
}

  // Validator personalizado a nivel de FormGroup: dos campos distintos

 removePet(): void {
  this.getUser().pets = this.getUser().pets.filter(p => p.id !== this.petId);
 }


}
