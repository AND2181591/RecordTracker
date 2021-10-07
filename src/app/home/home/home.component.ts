import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { map } from 'rxjs/operators';

import { SearchService } from '../search.service';

import { Artist } from 'src/app/shared/models/Artist';
import { Album } from 'src/app/shared/models/Album';

import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { OrderService } from 'src/app/order.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  artist: Artist = {} as Artist;
  added: boolean = false;

  alertSubscription: Subscription = {} as Subscription;

  constructor(
    private searchService: SearchService,
    private orderService: OrderService, 
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.alertSubscription = this.orderService.albumAdded$
      .subscribe(added => {
        this.added = added;
      });
  }


  onArtistSelect(artist: Artist) {
    const { id } = artist;
    this.added = false;
    
    this.searchService.getAuth()
      .subscribe(({ access_token }) => this.searchService.getAlbums(id.toString(), access_token)
        .pipe(
          map((results) => {
            const filtered: Album[] = [];
            for (let i = 0; i < results.items.length; i++) {
              if (results.items[i].available_markets.includes('US')) {
                filtered.push(results.items[i]);
              }
            }
            return filtered;
          })
        ).subscribe((results) => {
            this.albumSelectModal(this.artist.name, results);
          })
        );
  }


  private albumSelectModal(artistName: string, albums: Album[]) {
    
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '50vh', 
      left: '50vw'
    }
    dialogConfig.panelClass = 'makeItMiddle';

    dialogConfig.data = {
      artist: artistName, 
      albums: albums
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed()
      .subscribe((album) => {
        if (album) {
          this.orderService.addToOrders(this.artist.name, album);
        }
      });
  }

  ngOnDestroy() {
    this.added = false;
    this.alertSubscription.unsubscribe();
  }
}
