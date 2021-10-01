import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, from, Subject } from 'rxjs';

import { Order } from './shared/models/Order';
// import { AlbumInput } from './shared/models/AlbumInput';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // private onTheirWayCollection: AngularFirestoreCollection<Orders>;
  // private preOrdersCollection: AngularFirestoreCollection<Orders>;
  // onTheirWay$: Observable<Orders[]>;
  // preOrders$: Observable<Orders[]>;
  private shippedCollection: AngularFirestoreCollection = {} as AngularFirestoreCollection;
  private preorderedCollection: AngularFirestoreCollection = {} as AngularFirestoreCollection;
  shipped$: Observable<Order[]>;
  preordered$: Observable<Order[]>;

  albumAdded$ = new Subject<boolean>();

  constructor(private afs: AngularFirestore) {
    this.shippedCollection = afs.collection<Order>('onTheirWay');
    this.preorderedCollection = afs.collection<Order>('preOrders');
    this.shipped$ = this.shippedCollection.valueChanges({ idField: 'afId' });
    this.preordered$ = this.preorderedCollection.valueChanges({ idField: 'afId' });
  }

  addToOrders(albumRes: any, formInput: AlbumInput) {
    if (formInput.orderType === 'onTheirWay') {
      const newOrder = {
        id: albumRes.id.toString(), 
        artistName: albumRes.artists[0].name, 
        album: formInput.album, 
        image: albumRes.images[0].url, 
        orderType: formInput.orderType, 
        trackingNum: formInput.trackingNum
      };

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
      const newOrder = {
        id: albumRes.id.toString(), 
        artistName: albumRes.artists[0].name, 
        album: formInput.album, 
        image: albumRes.images[0].url, 
        orderType: formInput.orderType, 
        date: formInput.date
      }; 

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


  deleteOrder(order: Order) {
    if (order.orderType === 'onTheirWay') {
      const orderRef = this.afs.doc('onTheirWay/' + order.afId);
      orderRef.delete();
    } else {
      const orderRef = this.afs.doc('preOrders/' + order.afId);
      orderRef.delete();
    }
  }
}
