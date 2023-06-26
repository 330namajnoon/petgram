import { IUser } from './../../../ss/interfaces/IUser';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterController } from '../register.controller';
import { RegisterService } from 'src/services/register.service';

@Component({
  selector: 'app-imagePet',
  templateUrl: './image-pet.component.html',
  styleUrls: ['./image-pet.component.scss']
})
export class ImagePetComponent {
  ctrl = inject(RegisterController);
  form = this.ctrl.formImagePet;
  imageSrc: string = "assets/images/profile.png";

  constructor(private router: Router,private registerS:RegisterService) { }
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;
        this.form.patchValue({
          fileSource: reader.result as any
        });

      };

    }
  }
  async goNext() {
    console.log(this.ctrl.formDataUser.value)
    console.log(this.ctrl.formDataPet.value)
    console.log(this.ctrl.formImagePet.value)
    if (this.form.valid) {
      let file:any = document.getElementById("image_pet_file");
      this.registerS.setProfileImage(file.files[0] as File);
      let signup = await this.registerS.signup();
      if(!signup) {
        alert("este usuario ya existe");
      }
      this.router.navigateByUrl('/petgram');
    } else {
      alert("Debe elegir una foto de perfil")
    }
  }
}
