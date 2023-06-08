import { Routes, RouterModule } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './login/login.component';
import { ImagePetComponent } from './image-pet/image-pet.component';
import { DataPetComponent } from './data-pet/data-pet.component';
import { DataUserComponent } from './data-user/data-user.component';


const routes: Routes = [
  { path: '', component: FirstPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    children: [
      { path: '', component: DataUserComponent },
      { path: 'data-pet', component: DataPetComponent },
      { path: 'image-pets', component: ImagePetComponent },
    ],

  },
];

export const RegisterRoutes = RouterModule.forChild(routes);
