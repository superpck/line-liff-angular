import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./components/third-party-login/third-party-login.component').then(m => m.ThirdPartyLoginComponent) },
];
