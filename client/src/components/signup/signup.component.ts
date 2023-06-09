import { Component,ViewChild,ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animation } from 'src/assets/ts/animation';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @ViewChild('container')container!:ElementRef
  imageSrc: string = "assets/images/profile.png";
  form = new FormGroup({
    fileSource: new FormControl('', [Validators.required])
  })
  nextValue:number = 0;
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
    let container = (this.container.nativeElement) as HTMLDivElement;
    let scrollWidth = container.scrollWidth / 3;
    let scroll = scrollWidth * this.nextValue;
    let frame = scroll / 20;
    animation((frame)=> {
      if(container.scrollLeft !== scroll) {

        return true;
      }else {
        return false
      }
    })
    container.scrollLeft = scroll;
    this.nextValue++;
    console.log(scrollWidth)
  }
}
