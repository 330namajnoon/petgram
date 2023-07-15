import { Component } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';

@Component({
  selector: 'app-delete-pet',
  templateUrl: './delete-pet.component.html',
  styleUrls: ['./delete-pet.component.scss']
})
export class DeletePetComponent  extends AppServiceEx{

 isPasswordCorrect: boolean = false;
 enteredPassword: string = "";

 constructor(appService: AppService ,private proConfigService : ProfileConfigService){
  super(appService)
 }

 checkPassword(): void {

   if(this.getUser().password === this.enteredPassword)
   this.isPasswordCorrect = true;
 }


}
