import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'books/:subject/:id/details',
    loadComponent: () =>
      import('./pages/book-details/book-details.component').then(
        (c) => c.BookDetailsComponent
      ),
  },

  { path: '**', redirectTo: 'home' },
];
