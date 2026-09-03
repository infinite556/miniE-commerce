import { Routes } from '@angular/router';
import { AdminProductsComponent } from './pages/admin-products/admin-products.component';
import { authGuard } from './core/guards/auth/auth-guard'; 

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/products',
    pathMatch: 'full'
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [authGuard] 
  },

  {
    path: '**',
    redirectTo: 'admin/products'
  }
]