import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Album } from '../models/Album';

interface GetAlbums {
  artist: string;
  albums: Album[];
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  artist: string = '';
  albums: Album[] = [];

  selectedAlbum: Album = {} as Album;

  form = new FormGroup({
    selectedAlbum: new FormControl('', Validators.required), 
    orderType: new FormControl('', Validators.required), 
    variant: new FormControl(''), 
    trackingNum: new FormControl(''), 
    date: new FormControl('')
  });


  constructor(
    private dialogRef: MatDialogRef<ModalComponent>, 
    @Inject(MAT_DIALOG_DATA) data: GetAlbums
  ) {
    this.artist = data.artist;
    this.albums = data.albums;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  
  // Sets form control choice to separate property meant to display album image/info
  onAlbumSelect(selected: Album) {
    this.selectedAlbum = selected;
  }

  // Checks to verify if an album has been selected
  isAlbumSelected(selected: Album) {
    return Object.keys(selected).length > 0;
  }

  // Checks if there is both a tracking number and a est. shipping date. You can only have one.
  twoOrderTypes() {
    return this.form.controls.trackingNum.value && 
      this.form.controls.date.value ? true : false;
  }


  onCancel() {
    this.dialogRef.close();
  }
}
