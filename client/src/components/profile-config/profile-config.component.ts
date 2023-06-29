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
  selectedPet: IPet | undefined;
  selectOption: string = "Choose pet"
  selectValue: string = "";
  isMenuOpen: boolean = false;
  isMenuPetOpen: boolean = false;
  isMenuNewOpen: boolean = false;
  imageSrc: string | undefined;
  userData!: IUser ;
  petsData:IPet[] =[];
  deletedList : IUser[] = [];


  constructor(appService: AppService , private proConfig: ProfileConfigService){
    super(appService)


  }

  petForm = new FormGroup({
    id: new FormControl('',[Validators.required]),
    name: new FormControl('', [Validators.required, Validators.min(2)]),
    race: new FormControl<number>(1, [Validators.required]),
    gender: new FormControl('',[Validators.required])


  })

  userForm = new FormGroup({
    id: new FormControl('',[Validators.email]),
    email: new FormControl(''),
    name: new FormControl(''),
    lastName: new FormControl(''),
    image: new FormControl(''),
    age: new FormControl(18),
    address: new FormControl(''),
    country: new FormControl(),
    postalCode: new FormControl(0),
    phone: new FormControl(0),
    languages: new FormControl(""),
    pets: new FormControl([]),
    password: new FormControl(''),


  })

   ngOnInit() {
    this.userData = this.getUser();
    this.petsData = this.getUser().pets;
    console.log(this.petsData);


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
  //  if(this.userForm.valid) {

  //    }
  //    this.userForm.value

    let user : IUser = {
      id: this.userForm.get("id")?.value || "",
      name: this.userForm.get("name")?.value || "",
      lastName: this.userForm.get("lastName")?.value || "",
      birthDay: this.userForm.get("name")?.value || "",
      address: this.userForm.get("address")?.value || "",
      country: this.userForm.get("country")?.value || 0,
      postalCode: this.userForm.get("postalCode")?.value || 0,
      phone: this.userForm.get("phone")?.value || 0,
      image: this.userForm.get("image")?.value || "",
      email: this.userForm.get("email")?.value || "",
      password: this.userForm.get("password")?.value || "",
      language: this.userForm.get("language")?.value || "",
      pets: this.userForm.get("pets")?.value || [],
      followers:this.userData.followers,
      following: this.userData.following,
      storys:[],
      pendingFollowers: this.userData.pendingFollowers,
    }
    this.proConfig.save(user);

   this.userData = user;

  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
}


  toggleMenu2() {
  this.isMenuPetOpen = !this.isMenuPetOpen;
}

toggleMenu3() {
  this.isMenuNewOpen = !this.isMenuNewOpen;
}

editMode: boolean = false;

  editInput(item: any) {
    this.editMode = !this.editMode;
  }




 getEachPet(selectOption: string): void {
   this.selectedPet =  this.getUser().pets.find(p => p.name === selectOption);
   console.log(this.selectedPet);


  }

  changePetInfo() {
    let pet : IPet = {
      id: this.petForm.get("id")?.value || "",
      user_id: this.petForm.get('user_id')?.value || "",
      name: this.petForm.get("name")?.value || "",
      birthDay: this.petForm.get('birthday')?.value || "",
      type: this.petForm.get("type")?.value || 1,
      race: this.petForm.get("race")?.value || 1,
      gender: this.petForm.get("gender")?.value || "",
      description: this.petForm.get("description")?.value || ""
    }
   this.petsData.forEach(item => {
    if(!(item.id === pet.id)) return;
    item = pet;
   });




  }





 }















