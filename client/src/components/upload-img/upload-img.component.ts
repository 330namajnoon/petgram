import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceEx } from 'src/extends/AppServiceEx';
import { IUser } from 'src/interfaces/IUser';
import { AppService } from 'src/services/app.service';
import { ProfileConfigService } from 'src/services/profile-config.service';

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styleUrls: ['./upload-img.component.scss']
})


export class UploadImgComponent extends AppServiceEx implements OnInit{

  primitiveImgSrc!: string;
  imageSrc!: string ;
  isImgSrc: boolean = false;
  user!: IUser ;
  constructor(app: AppService, private proConfigService: ProfileConfigService) {
    super(app)
  }

imgForm = new FormGroup({
  image: new FormControl('')
})


ngOnInit() {
  this.user = this.getUser()
  console.log(this.user);
  this.primitiveImgSrc = this.user.image
  console.log(this.primitiveImgSrc);

}


uploadFile(event: Event): void {
  this.isImgSrc = true;

 

  let target = event.target as HTMLInputElement;

  if (target.files !== null && target.files.length > 0){
    let fileImg = target.files[0];

    // to show the image to user
    let reader = new FileReader();
    reader.onload = ev => this.imageSrc = reader.result as string;
    reader.readAsDataURL(fileImg); // read the image
    console.log(fileImg);

  }

}
saveImg(){
let updatedUser: IUser = {...this.user , image: this.imageSrc}
this.proConfigService.updateData(updatedUser)
}




}


