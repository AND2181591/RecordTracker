import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Subscription } from 'rxjs';
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
  // searchSubscription: Subscription;

  searchForm: FormGroup = new FormGroup({
    query: new FormControl('')
  });

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getAuth()
      .subscribe(({ access_token }) => { console.log(access_token) });


    // this.searchSubscription = this.searchForm.get('query').valueChanges
    // .pipe(
    //   debounceTime(100), 
    //   distinctUntilChanged()
    // )
    // .subscribe(query => this.searchService.getAuth()
    //   .subscribe(({ access_token }) => this.searchService.searchMusic(query, 'artist', access_token)
    //     .subscribe((results: any) => {
    //       if (Object.keys(results).length === 0) { // Handles the empty observable
    //         return;
    //       }
    //       this.results = results.artists.items.slice(0, 5); // Otherwise, assigns the artists results to the array
    //     })
    //   )
    // );
  }

}
