import { Component, OnInit } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPet } from 'src/interfaces/IPet';

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})
export class ProfileConfigComponent extends AppServiceEx implements OnInit{

  isMenuOpen: boolean = false;
  imageSrc: string | undefined;
  userData!: IUser ;
  petsData:IPet[] =[]
  constructor(appService: AppService , private proConfig: ProfileConfigService){
    super(appService)


  }

  userForm = new FormGroup({
    id: new FormControl('',[Validators.email]),
    email: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    image: new FormControl(''),
    age: new FormControl(18),
    address: new FormControl(''),
    country: new FormControl(''),
    postalCode: new FormControl(0),
    phone: new FormControl(0),
    languages: new FormControl(""),
    pets: new FormControl([]),
    password: new FormControl(''),


  })

   ngOnInit() {
   this.petsData = this.getUser().pets;
   console.log(this.petsData)

    console.log(this.userData);
  }

  save(): void {
    console.log(this.userForm.get('email')?.value);
    console.log(this.userForm.get('fullName')?.value);
  }

  uploadFile(event: Event): void {
    let target = event.target as HTMLInputElement;

    if (target.files !== null && target.files.length > 0){
      let fileImg = target.files[0];

      // Opcional: mostrar la imagen al usuario
      let reader = new FileReader();
      reader.onload = ev => this.imageSrc = reader.result as string;// qué hacer cuando se lea la imagen
      reader.readAsDataURL(fileImg); // leer la imagen
    }

  }

  changeInfo() {
    if(this.userForm.valid) {

    }
    this.userForm.value
    let user : IUser = {
      id: this.userForm.get("id")?.value || "",
      name: this.userForm.get("name")?.value || "",
      lastName: this.userForm.get("lastName")?.value || "",
      birthDay: this.userForm.get("name")?.value || "",
      address: this.userForm.get("address")?.value || "",
      country: this.userForm.get("country")?.value || "",
      postalCode: this.userForm.get("postalCode")?.value || 0,
      phone: this.userForm.get("phone")?.value || 0,
      image: this.userForm.get("image")?.value || "",
      email: this.userForm.get("email")?.value || "",
      password: this.userForm.get("password")?.value || "",
      Language: this.userForm.get("language")?.value || "",
      pets: this.userForm.get("pets")?.value || [],
      followers:this.userData.followers,
      following: this.userData.following,
      pendingFollowers: this.userData.pendingFollowers,
      storys:[]
    }




  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
}

editMode: boolean = false;

 editInput(item: any) {   this.editMode = !this.editMode;
 }



}





