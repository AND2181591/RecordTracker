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

  moved: boolean = false;
  movedSubscription: Subscription = {} as Subscription;
  error: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();

    this.movedSubscription = this.orderService.albumAdded$
      .subscribe(moved => {
        this.moved = moved;
      });
  }


  getOrders() {
    this.preorderedSubscription = this.orderService.preordered$
    .pipe(
      map((orders) => {
        orders.sort((c: any, d: any) => {
          return c.date - d.date;
        });

        const updatedOrders: Order[] = [];
        for(let i = 0; i < orders.length; i++) {
          if (orders[i].date) {
            orders[i].date = orders[i].date.toDate();
            if (orders[i].date < new Date()) {
              orders[i].late = true;
            }
          }
          

          updatedOrders.push(orders[i]);
        }
        return updatedOrders;
      })
    ).subscribe((orders: Order[]) => {
        this.orders = orders;
        this.moved = false;
        this.error = null;
      }, 
      error => {
        this.error = error;
      });
  }

  onMoveToShipped(order: Order) {
    this.orderService.moveOrder(order);
  }

  onRemoveOrder(order: Order) {
    this.orderService.deleteOrder(order);
  }

  ngOnDestroy() {
    this.movedSubscription.unsubscribe();
    this.preorderedSubscription.unsubscribe();
  }
}
