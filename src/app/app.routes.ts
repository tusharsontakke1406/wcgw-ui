import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'wcgw-definitions',
    loadComponent: () =>
      import('./features/wcgw-definitions/wcgw-definitions.component')
        .then(m => m.WcgwDefinitionsComponent)
  },
  {
    path: 'entities',
    loadComponent: () =>
      import('./features/entity-management/pages/entity-list/entity-list.component')
        .then(m => m.EntityListComponent)
  },
  {
    path: 'entities/new',
    loadComponent: () =>
      import('./features/entity-management/pages/entity-create/entity-create.component')
        .then(m => m.EntityCreateComponent)
  },
  {
    path: 'entities/:id',
    loadComponent: () =>
      import('./features/entity-management/pages/entity-details/entity-details.component')
        .then(m => m.EntityDetailsComponent)
  },
  {
    path: 'entities/:id/edit',
    loadComponent: () =>
      import('./features/entity-management/pages/entity-create/entity-create.component')
        .then(m => m.EntityCreateComponent)
  },
  { path: '**', redirectTo: 'dashboard' }
];
