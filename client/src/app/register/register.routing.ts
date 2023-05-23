import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DataUserComponent } from './data-user/data-user.component';
import { DataPetComponent } from './data-pet/data-pet.component';

const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup',component:SignupComponent }
];

export const RegisterRoutes = RouterModule.forChild(routes);
