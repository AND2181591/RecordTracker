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

  constructor() { }

  ngOnInit(): void {
  }

  onRemoveItem(order: Order) {
    this.remove.emit(order);
  }
}
