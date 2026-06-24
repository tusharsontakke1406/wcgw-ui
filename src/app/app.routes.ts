import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.dashboardRoutes)
  },
  // ...other feature routes
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];