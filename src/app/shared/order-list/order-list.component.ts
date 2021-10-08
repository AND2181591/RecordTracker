import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Order } from '../models/Order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  @Input() orders: Order[] = [];
  @Output() remove = new EventEmitter();
  @Output() moveToShipped = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onMoveToShipped(order: Order) {
    this.moveToShipped.emit(order);
  }

  onRemoveItem(order: Order) {
    this.remove.emit(order);
  }
}
