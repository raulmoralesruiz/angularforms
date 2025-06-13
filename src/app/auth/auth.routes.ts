import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: '**',
        redirectTo: 'register',
      },
    ]
  }
]
