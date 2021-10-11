import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface Message {
  type: string;
  message: string;
}

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.css']
})
export class ModalGenericComponent implements OnInit {
  type: string = '';
  message: string = '';

  constructor(
    private modalGenRef: MatDialogRef<ModalGenericComponent>, 
    @Inject(MAT_DIALOG_DATA) data: Message
  ) {
    this.type = data.type;
    this.message = data.message;
  }

  ngOnInit(): void {
  }

  close() {
    this.modalGenRef.close();
  }

}
