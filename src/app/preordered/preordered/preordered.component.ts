import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
      .pipe(
        map((orders) => {
          orders.sort((c: any, d: any) => {
            return c.date - d.date;
          });

          const updatedOrders: Order[] = [];
          for(let i = 0; i < orders.length; i++) {
            orders[i].date = orders[i].date.toDate();
            updatedOrders.push(orders[i]);
          }
          return updatedOrders;
        })
      ).subscribe((orders: Order[]) => {
          this.orders = orders;
        });
  }

  onRemoveOrder(order: Order) {
    this.orderService.deleteOrder(order);
  }

  ngOnDestroy() {
    this.preorderedSubscription.unsubscribe();
  }


  // results.sort((a, b) => {
  //   const c = +new Date(a.date.year, a.date.month, a.date.day);
  //   const d = +new Date(b.date.year, b.date.month, b.date.day);
  //   return c - d;
  // }
}
