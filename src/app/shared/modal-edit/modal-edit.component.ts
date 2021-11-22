import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Order } from '../models/Order';


interface Edit {
  order: Order;
}

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {
  order: Order = {} as Order;

  editForm = new FormGroup({
    variant: new FormControl(''), 
    trackingNum: new FormControl(''), 
    date: new FormControl('')
  });

  constructor(
    private dialogRef: MatDialogRef<ModalEditComponent>, 
    @Inject(MAT_DIALOG_DATA) data: Edit
  ) {
    this.order = data.order;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const variant = this.editForm.get('variant')?.value;
    const trackingNum = this.editForm.get('trackingNum')?.value;
    const date = this.editForm.get('date')?.value;

    if (variant) {
      this.order.variant = variant;
    }
    if (trackingNum) {
      this.order.trackingNum = trackingNum;
    }
    if (date) {
      this.order.date = date;
    }
    
    this.dialogRef.close(this.order);
  }

  onCancel() {
    this.dialogRef.close();
  }

}
