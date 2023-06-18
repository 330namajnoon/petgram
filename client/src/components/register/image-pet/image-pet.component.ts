import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterController } from '../register.controller';

@Component({
  selector: 'app-imagePet',
  templateUrl: './image-pet.component.html',
  styleUrls: ['./image-pet.component.scss']
})
export class ImagePetComponent {
  ctrl = inject(RegisterController);
  form = this.ctrl.formImagePet;
  imageSrc: string = "assets/images/profile.png";

  constructor(private router: Router) { }
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
  goNext() {
    console.log(this.ctrl.formDataUser.value)
    console.log(this.ctrl.formDataPet.value)
    console.log(this.ctrl.formImagePet.value)
    if (this.form.valid) {
      this.router.navigateByUrl('/petgram');
    } else {
      alert("Debe elegir una foto de perfil")
    }
  }
}
