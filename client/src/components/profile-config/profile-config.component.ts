import { RegisterController } from './../register/register.controller';
import { httpClient } from 'src/assets/ts/httpClient';
import { Component, OnInit, inject } from '@angular/core';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPet } from 'src/interfaces/IPet';
import { Router } from '@angular/router';
import { RegisterService } from 'src/services/register.service';
import { ITypes } from 'src/interfaces/ITypes';
import { IRaces } from 'src/interfaces/IRaces';

@Component({
  selector: 'app-profile-config',
  templateUrl: './profile-config.component.html',
  styleUrls: ['./profile-config.component.scss']
})


export class ProfileConfigComponent extends AppServiceEx implements OnInit {



  //--------------------------atributos ---------------------------------

  selectedPet: IPet | undefined;
  selectOption: string = "Choose pet"
  selectValue: string = "";
  isMenuOpen: boolean = false;
  isMenuPetOpen: boolean = false;
  isMenuNewOpen: boolean = false;
  isMenuDelOpen: boolean = false;
  isMenuLoginoutOpen: boolean = false;
  imageSrc: string | undefined;
  userData!: IUser;
  petsData: IPet[] = [];
  deletedList: IUser[] = [];
  proConfigService: any;
  types!: ITypes[];
  races!: IRaces[];
  countries: any;

  petForm = inject(RegisterController).formDataPet
  formImagePet = inject(RegisterController).formImagePet

  //---------------------------------------constructor -------------------------------------


  constructor(appService: AppService,
    private proConfig: ProfileConfigService,
    private router: Router,
    private regService: RegisterService,

  ) {
    super(appService)
  }
  //------------------------------------------- methods ----------------------------------

  ngOnInit() {
    this.userData = this.getUser();
    this.petsData = this.getUser().pets;
    console.log(this.petsData);

  }
  getRaces():{id:number;race:string}[] {
    return this.races;}

    async downloadRaces(event:Event) {
      let select = event.target as HTMLSelectElement;
      if(select.value !== "") {
        this.setLoading(true);
        let res = await this.regService.getRaces(parseInt(select.value));
        this.setLoading(false);
        if (!res.error) {
          this.races = res.data;
        } else {
          this.router.navigate(["/error"], { state: { error: res.error } });
        }
      }
    }
    getTypes():{id:number;type:string}[] {
      return this.types;
    }

  change_type(e: Event) {
    let select = e.target as HTMLSelectElement;
    this.get_ts(parseInt(select.value));
    alert("hola")
  }

  async getCountry() {
    this.setLoading(true)
    let res = await this.regService.getCoutrys()
    if (!res.error) {
      this.countries = res.data;
      console.log(this.language.language)
    } else {
      this.router.navigate(["./petgram", "error"], { state: { error: res.error } });
    }

    this.setLoading(false)
  }


  async get_ts(id: number | undefined) {
    this.setLoading(true);
    let res = await this.proConfig.getTypes();
    if (res.data) {
      this.types = res.data;
      if (this.selectedPet) {
        let res = await this.proConfig.getRaces(id ? id : this.selectedPet.type);
        if (res.data) {
          this.races = res.data;
          this.setLoading(false);
        }
        else {
          this.router.navigate(["/error"], { state: { error: res.error } });
          this.setLoading(false);
        }
      }
    }
    else {
      this.router.navigate(["/error"], { state: { error: res.error } });
      this.setLoading(false);
    }
  }

  // ------------------------------------ USER FORM --------------------------------------

  userForm = new FormGroup({
    id: new FormControl('', [Validators.email]),
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
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', [Validators.required])
  })

  save(): void {
    console.log(this.userForm.get('email')?.value);
    console.log(this.userForm.get('fullName')?.value);
  }

  uploadFile(event: Event): void {
    let target = event.target as HTMLInputElement;

    if (target.files !== null && target.files.length > 0) {
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

    let user: IUser = {
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
      followers: this.userData.followers,
      following: this.userData.following,
      storys: [],
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


  toggleMenu4() {
    this.isMenuDelOpen = !this.isMenuDelOpen;
  }

  toggleMenu5() {
    this.isMenuLoginoutOpen = !this.isMenuLoginoutOpen;
  }

  editMode: boolean = false;

  editInput(item: any) {
    this.editMode = !this.editMode;
  }


  // ------------------------------------- Select pet In Pet Data --------------------------

  getEachPet(selectOption: string): void {
    this.selectedPet = this.getUser().pets.find(p => p.name === selectOption);
    console.log(this.selectedPet);
    this.get_ts(undefined);

    //this.selectedPet.type = this.get_ts();

  }

  //----------------------------------- Update User Data -------------------------------


  updateUserData(atr: string) {
    switch (atr) {
      case "email":
        this.getUser().email = this.userForm.get(atr)?.value || "";
        break;
      case "name":
        this.getUser().name = this.userForm.get(atr)?.value || "";
        break;
      case "lastName":
        this.getUser().lastName = this.userForm.get(atr)?.value || "";
        break;
      case "country":
        this.getUser().country = this.userForm.get(atr)?.value || "";
        break;
      case "address":
        this.getUser().address = this.userForm.get(atr)?.value || "";
        break;
      case "postalCode":
        this.getUser().postalCode = this.userForm.get(atr)?.value || 0;
        break;
      case "birthDay":
        this.getUser().birthDay = this.userForm.get(atr)?.value || "";
        break;
      default:
        break;

    }





    // let id =this.userForm.get("id")?.value || "";
    // let name = this.userForm.get("name")?.value || "";
    // let lastName = this.userForm.get("lastName")?.value || "";
    // let birthDay =this.userForm.get("name")?.value || "";
    // let address =  this.userForm.get("address")?.value || "";
    // let country = this.userForm.get("country")?.value || 0;
    // let postalCode = this.userForm.get("postalCode")?.value || 0;
    // let phone = this.userForm.get("phone")?.value || 0;
    // let image = this.userForm.get("image")?.value || "";
    // let email = this.userForm.get("email")?.value || "";
    // let password =  this.userForm.get("password")?.value || "";
    // let language =  this.userForm.get("language")?.value || "";

    // const newUser: IUser = {
    //   name,
    //   lastName,
    //   pets: [],
    //   id: '',
    //   birthDay,
    //   address,
    //   country,
    //   postalCode,
    //   phone,
    //   image: this.getURL(),
    //   email,
    //   password,
    //   language,
    //   followers: [],
    //   following: [],
    //   pendingFollowers: [],
    //   storys: []

    //   // this.httpClient.post()
    // }






  }




  // -------------------------------- Update Pet Data  ----------------------------------


  updatePetData(atr: string) {
    switch (atr) {
      case "name":
        this.selectedPet!.name = this.petForm.get(atr)?.value || "";
        break;
      case "type":
        this.selectedPet!.type = this.petForm.get(atr)?.value || 0;
        break;
      case "race":
        this.selectedPet!.race = this.petForm.get(atr)?.value || 0;
        break;
      case "gender":
        this.selectedPet!.gender = this.petForm.get(atr)?.value || "";
        break;
      case "description":
        this.selectedPet!.description = this.petForm.get(atr)?.value || "";
        break;

      default:
        break;

    }

  }


  // ------------------------------------ Add New Pet ----------------------------------


  //   addPet(pet : IPet): void {

  //     let id= this.petForm.get("id")?.value || "";
  //     let user_id = this.petForm.get('user_id')?.value || "";
  //     let name = this.petForm.get("name")?.value || "";
  //     let birthDay = this.petForm.get('birthday')?.value || "";
  //     let type = this.petForm.get("type")?.value || 1;
  //     let race =  this.petForm.get("race")?.value || 1;
  //     let gender = this.petForm.get("gender")?.value || "";
  //     let description = this.petForm.get("description")?.value || "";

  //     pet = {
  //      id: id,
  //      user_id: user_id,
  //      name: name,
  //      birthDay: birthDay,
  //      type: type,
  //      race: race,
  //      gender: gender,
  //      description: description
  //    }

  //    this.getUser().pets.push(pet)
  //    console.log(this.getUser().pets.push(pet));
  // }






  addPet(pet: IPet): void {

    let id = this.petForm.get("id")?.value || "";
    let user_id = this.petForm.get('user_id')?.value || "";
    let name = this.petForm.get("name")?.value || "";
    let birthDay = this.petForm.get('birthday')?.value || "";
    let type = this.petForm.get("type")?.value || 1;
    let race = this.petForm.get("race")?.value || 1;
    let gender = this.petForm.get("gender")?.value || "";
    let description = this.petForm.get("description")?.value || "";

    pet = {
      id: id,
      user_id: user_id,
      name: name,
      birthDay: birthDay,
      type: type,
      race: race,
      gender: gender,
      description: description
    };

    // Ensure that the 'pets' property is initialized as an empty array
    if (!this.getUser().pets) {
      this.getUser().pets = [];
    }

    // Add the pet to the user's pets array
    this.getUser().pets.push(pet);

    console.log(this.getUser().pets);
  }


  // ------------------------------------ Delete Pet From The List ------------------------------

  pet_delete_routing(event: Event) {
    let a = event.target as HTMLLinkElement;
    this.router.navigate(["./petgram", "settings", "delete-pet"], { state: { petId: a.id, petName: a.innerHTML } });
  }



}












