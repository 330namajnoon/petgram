import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from '../components/first-page/first-page.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { DataPetComponent } from '../components/data-pet/data-pet.component';
import { DataUserComponent } from '../components/data-user/data-user.component';


const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    children: [
      { path: '', component: SignupComponent },
      { path: 'data-user', component: DataUserComponent },
      { path: 'data-pet', component: DataPetComponent },
    ],
  },
];

export const RegisterRoutes = RouterModule.forChild(routes);
