import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imagePet',
  templateUrl: './image-pet.component.html',
  styleUrls: ['./image-pet.component.scss']
})
export class ImagePetComponent {
  imageSrc: string = "assets/images/profile.png";
  form = new FormGroup({
    fileSource: new FormControl('', [Validators.required])
  })
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
    if (this.form.valid) {
      this.router.navigateByUrl('/signup/data-user');
    } else {
      alert("Debe elegir una foto de perfil")
    }
  }
}
