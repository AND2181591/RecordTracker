import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { OrderService } from 'src/app/order.service';

import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-shipped',
  templateUrl: './shipped.component.html',
  styleUrls: ['./shipped.component.css']
})
export class ShippedComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  orderSubscription: Subscription = {} as Subscription;
  error: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  
  getOrders() {
    this.orderSubscription = this.orderService.shipped$
    .subscribe((orders) => {
      this.orders = orders;
      this.error = null;
    }, 
    error => {
      this.error = error;
    });
  }

  onRemoveOrder(order: Order) {
    this.orderService.deleteOrder(order);
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }
}
