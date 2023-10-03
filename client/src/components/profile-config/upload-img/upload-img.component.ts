import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})


export class UploadImgComponent extends AppServiceEx {
  isEdit: boolean = false;
  primitiveImgSrc!: string;
  imageSrc!: string;
  isImgSrc: boolean = false;
  user!: IUser;
  file!: File;
  constructor(app: AppService, private proConfigService: ProfileConfigService, private router: Router) {
    super(app)
  }

  imgForm = new FormGroup({
    image: new FormControl('')
  })





  uploadFile(event: Event): void {

    let target = event.target as HTMLInputElement;
    let file: any = target.files ? target.files[0] : [];
    let reader = new FileReader();
    this.file = file;
    reader.addEventListener("load", () => {
      this.imageSrc = reader.result as string;
      //this.getUser().image = reader.result as string;
    })
    reader.readAsDataURL(file); // read the image



  }
  async saveImg() {
    if (this.file) {
      this.setLoading(true);
      let res = await this.proConfigService.updateImage(this.getUser().id, this.file);
      if (!res.error) {
        this.setLoading(false);
        window.location.reload();
        alert(this.language.getWord("saved"));
      } else {
        this.router.navigate(["/petgram", "error"], { state: { error: res.error } });
      }
    } else {
      alert('Debe seleccionar una imagen');
    }
  }





  editImg() {
    this.isEdit = !this.isEdit;
  }

  getImage() {
    document.getElementById("avatar")?.click();
  }



}


