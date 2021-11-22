import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, from, Subject } from 'rxjs';

import { Order } from './shared/models/Order';
import { AlbumInput } from './shared/models/AlbumInput';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private shippedCollection: AngularFirestoreCollection = {} as AngularFirestoreCollection;
  private preorderedCollection: AngularFirestoreCollection = {} as AngularFirestoreCollection;
  shipped$: Observable<any>;
  preordered$: Observable<any>;

  albumAdded$ = new Subject<boolean>();

  constructor(
    private afs: AngularFirestore
  ) {
    this.shippedCollection = afs.collection<Order>('shipped');
    this.preorderedCollection = afs.collection<Order>('preordered');
    this.shipped$ = this.shippedCollection.valueChanges({ idField: 'afId' });
    this.preordered$ = this.preorderedCollection.valueChanges({ idField: 'afId' });
  }


  private assembleOrder(artist: string, formInput: AlbumInput) {
    const trackingUrl = 'https://tools.usps.com/go/TrackConfirmAction_input?strOrigTrackNum=';
    const newOrder: Order = {
      artistName: artist, 
      album: formInput.selectedAlbum.name, 
      image: formInput.selectedAlbum.images[0].url, 
      orderType: formInput.orderType, 
      trackingUrl: trackingUrl,  
      trackingNum: formInput.trackingNum, 
      date: formInput.date, 
      variant: formInput.variant
    }

    return newOrder;
  }
  

  addToOrders(artist: string, formInput: AlbumInput) {
    const newOrder = this.assembleOrder(artist, formInput);

    if (newOrder.orderType === "shipped") {
      return from(this.shippedCollection.add(newOrder))
        .subscribe({
          next: (() => {
            this.albumAdded$.next(true);
          }), 
          error: (() => {
            this.albumAdded$.next(false);
          })
        });
    } else {
      return from(this.preorderedCollection.add(newOrder))
        .subscribe({
          next: (() => {
            this.albumAdded$.next(true);
          }), 
          error: (() => {
            this.albumAdded$.next(false);
          })
        });
    }
  }


  moveOrder(order: Order) {
    this.deleteOrder(order);

    order.orderType = 'shipped';
    return from(this.shippedCollection.add(order))
        .subscribe({
          next: (() => {
            this.albumAdded$.next(true);
          }), 
          error: (() => {
            this.albumAdded$.next(false);
          })
        });
  }


  editOrder(order: Order) {
    if (order.orderType === 'shipped') {
      const orderRef = this.afs.doc('shipped/' + order.afId);
      orderRef.update(order);
    } else {
      const orderRef = this.afs.doc('preordered/' + order.afId);
      orderRef.update(order);
    }
  }


  deleteOrder(order: Order) {
    if (order.orderType === 'shipped') {
      const orderRef = this.afs.doc('shipped/' + order.afId);
      orderRef.delete();
    } else {
      const orderRef = this.afs.doc('preordered/' + order.afId);
      orderRef.delete();
    }
  }
}
