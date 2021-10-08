import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from '../search.service';
import { Artist } from 'src/app/shared/models/Artist';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  results: Artist[] = [];
  @Output() artist = new EventEmitter();

  searchForm: FormGroup = new FormGroup({
    query: new FormControl('')
  });

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchForm.get("query")?.valueChanges
      .pipe(
        debounceTime(100), 
        distinctUntilChanged()
      )
      .subscribe(query => this.searchService.getAuth()
        .subscribe(({ access_token }) => this.searchService.searchArtist(query, "artist", access_token)
          .subscribe((results) => {
            const artists = results.artists.items.slice(0, 5);
            this.results = [];
            artists.forEach((artist) => {
              this.results.push(artist);
            });          
          }, 
          error => {
            this.results = [];
          })
        )
      );
  }

  onSubmit(selection: Artist) {
    this.artist.emit(selection);
  }

}
