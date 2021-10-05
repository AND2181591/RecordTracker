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
  trackingUrl: string = 'https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=';

  orderSubscription: Subscription = {} as Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.shipped$
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }
}
