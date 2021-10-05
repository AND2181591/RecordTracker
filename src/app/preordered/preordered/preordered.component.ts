import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order.service';

import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-preordered',
  templateUrl: './preordered.component.html',
  styleUrls: ['./preordered.component.css']
})
export class PreorderedComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  preorderedSubscription: Subscription = {} as Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.preorderedSubscription = this.orderService.preordered$
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  ngOnDestroy() {
    this.preorderedSubscription.unsubscribe();
  }
}
