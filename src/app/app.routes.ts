import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component')
        .then((m) => m.RegisterComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'item-detail/:id',
    loadComponent: () =>
      import('./pages/item-detail/item-detail.component')
        .then((m) => m.ItemDetailComponent),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/item-favorites/item-favorites.component')
        .then((m) => m.ItemFavoritesComponent),
  },
  {
    path: 'item-form/:tipo',
    loadComponent: () =>
      import('./pages/item-form/item-form.component')
        .then((m) => m.ItemFormComponent),
  },
  {
    path: 'item-list/:tipo',
    loadComponent: () =>
      import('./pages/item-list/item-list.component')
        .then((m) => m.ItemListComponent),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
