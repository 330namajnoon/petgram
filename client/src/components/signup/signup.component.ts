import { Component,ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animation } from 'src/assets/ts/animation';
import { RegisterService } from 'src/services/register.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('container')container!:ElementRef;

  imageSrc: string = "assets/images/profile.png";
  form = new FormGroup({
    fileSource: new FormControl('', [Validators.required])
  })
  nextValue:number = 1;
  constructor(private router: Router,private registerService:RegisterService) { }
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
    if(this.nextValue < 3 && this.registerService.getScrollPromise()) {
      let container = (this.container.nativeElement) as HTMLDivElement;
      let scrollWidth = container.scrollWidth / 3;
      let scroll = scrollWidth * this.nextValue;
      let frame = scrollWidth / 40;
      animation((_frame)=> {
        if(container.scrollLeft <= scroll) {
          container.scrollLeft += frame;
          return true;
        }else {
          this.registerService.setScrollPromise(false);
          return false
        }
      })
      this.nextValue++;
    }

  }
}
