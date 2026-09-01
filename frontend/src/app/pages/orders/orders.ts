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
  userId: string = '12345';

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.ordersService.getUserOrders(this.userId).subscribe({
      next: (data) => this.orders = data,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  placeOrder(): void {
    const newOrder = {
      userId: this.userId,
      items: [{ productId: 'prod_1', quantity: 1, price: 100 }],
      totalAmount: 100
    };

    this.ordersService.createOrder(newOrder).subscribe({
      next: (res) => {
        alert('Order placed successfully!');
        this.fetchOrders();
      },
      error: (err) => console.error('Error creating order:', err)
    });
  }
}