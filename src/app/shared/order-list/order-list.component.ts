import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderService } from 'src/app/order.service';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

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

  constructor(
    private orderService: OrderService, 
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  onEdit(order: Order) {
    this.albumEditModal(order)
  }

  onMoveToShipped(order: Order) {
    this.moveToShipped.emit(order);
  }

  onRemoveItem(order: Order) {
    this.remove.emit(order);
  }


  private albumEditModal(order: Order) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '50vh', 
      left: '50vw'
    }
    dialogConfig.panelClass = 'makeItMiddle';
    
    dialogConfig.data = {
      order: order
    };

    const dialogRef = this.dialog.open(ModalEditComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((order) => {
        if (order) {
          this.orderService.editOrder(order);
        }
      });
  }
}
