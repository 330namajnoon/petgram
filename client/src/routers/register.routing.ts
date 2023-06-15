import { ImagePetComponent } from './../components/image-pet/image-pet.component';
import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from '../components/first-page/first-page.component';
import { LoginComponent } from '../components/login/login.component';
import { DataPetComponent } from '../components/data-pet/data-pet.component';
import { DataUserComponent } from '../components/data-user/data-user.component';


const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    children: [
      { path: '', component: DataUserComponent },
      { path: 'data-pet', component: DataPetComponent },
      { path: 'image-pet', component: ImagePetComponent },
    ],
  },
];

export const RegisterRoutes = RouterModule.forChild(routes);
