import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login').then(m => m.Login) },
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    children: [
      { path: 'products', loadComponent: () => import('./features/products/products').then(m => m.Products) },
      { path: 'users', loadComponent: () => import('./features/users/users').then(m => m.Users) },
      { path: 'product-categories', loadComponent: () => import('./features/product-categories/product-categories').then(m => m.ProductCategories) }
    ]
  }
];
