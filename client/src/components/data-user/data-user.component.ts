import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss'],
})
export class DataUserComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthday: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
    confirmPassword: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9$%&/()]{8,20}$')]),
  });

  constructor(private router: Router) { }

  goNext() {
    this.form.markAllAsTouched();
    let password = this.form.get('password')?.value;
    let confirmPassword = this.form.get('confirmPassword')?.value;
    if (password === confirmPassword) {
      if (this.form.valid) {
        this.router.navigateByUrl('/signup/data-pet');
      } else {
        alert("Faltan datos en el formulario")
      }
    } else {
      alert("Las contraseñas no coinciden")
    }
  }

}
