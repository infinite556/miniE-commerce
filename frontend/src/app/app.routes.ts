import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders';

export const routes: Routes = [
  { path: 'orders', component: OrdersComponent },
  { path: '', redirectTo: 'orders', pathMatch: 'full' }
];