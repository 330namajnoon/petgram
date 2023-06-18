import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from '../components/first-page/first-page.component';
import { LoginComponent } from '../components/login/login.component';
import { ImagePetComponent } from 'src/components/register/image-pet/image-pet.component';
import { DataPetComponent } from 'src/components/register/data-pet/data-pet.component';
import { DataUserComponent } from 'src/components/register/data-user/data-user.component';


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
