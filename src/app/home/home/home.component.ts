import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/order.service';
import { Artist } from 'src/app/shared/models/Artist';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  artist: Artist = {} as Artist;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  onArtistSelect() {
    
  }
}
