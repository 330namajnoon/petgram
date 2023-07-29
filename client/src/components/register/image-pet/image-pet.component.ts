import { IUser } from './../../../ss/interfaces/IUser';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterController } from '../register.controller';
import { RegisterService } from 'src/services/register.service';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-imagePet',
  templateUrl: './image-pet.component.html',
  styleUrls: ['./image-pet.component.scss']
})
export class ImagePetComponent extends AppServiceEx {
  ctrl = inject(RegisterController);
  form = this.ctrl.formImagePet;
  imageSrc: string = "assets/images/profile.png";

  constructor(private router: Router,private registerS:RegisterService,appS:AppService) {
    super(appS);
  }
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      this.registerS.setPetImage(file);
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
      this.setLoading(true);
      let res = await this.registerS.signup();
      this.setLoading(false);
      if(res.error) {
        if(res.error == "this_user_exists") {
          alert(this.language.getWord("this_user_exists"));
          this.router.navigateByUrl('/signup');
        }else {
          this.router.navigate(["/error"],{state:{error:res.error}});
        }
      }else {
        this.router.navigateByUrl('/login');
      }
    } else {
      alert(this.language.getWord("you_must_choose_a_profile_photo"));
    }
  }
}
