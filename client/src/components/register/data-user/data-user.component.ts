import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterController } from '../register.controller';

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss'],
})
export class DataUserComponent {
  ctrl = inject(RegisterController);
  form = this.ctrl.formDataUser;

  constructor(private router: Router) { }

  goNext() {
    console.log(this.ctrl.formDataUser.value)
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
