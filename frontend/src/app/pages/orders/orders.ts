import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.html',
  styleUrl: './orders.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userId: string = '650c1f1e1c9d8b0012a34567';

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.ordersService.getUserOrders(this.userId).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => {
        console.warn('Backend endpoint active, waiting for team integration:', err);
      }
    });
  }

  placeOrder(): void {
    const newOrder = {
      _id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId: this.userId,
      items: [
        {
          productId: 'PROD-TEST-123',
          quantity: 1,
          price: 100
        }
      ],
      totalAmount: 100,
      status: 'Pending',
      shippingAddress: '123 Main St, Cairo'
    };

    this.ordersService.createOrder(newOrder).subscribe({
      next: (res) => {
        this.orders.push(res);
      },
      error: () => {
        this.orders.push(newOrder);
      }
    });
  }
}