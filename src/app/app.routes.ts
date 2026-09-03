import { Routes } from '@angular/router';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/products',
    pathMatch: 'full'
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent
  },
  {
    path: '**',
    redirectTo: 'admin/products'
  }
];
