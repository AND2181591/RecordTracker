import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";

import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from "src/environments/environment";
import { AlbumResults } from '../shared/models/AlbumResults';
import { Artist } from "../shared/models/Artist";


interface AccessToken {
  access_token: string;
}

interface Artists {
  artists: {
    items: Artist[]
  }
}


@Injectable({
  providedIn: "root"
})
export class SearchService {
  private clientId: string = environment.clientId;
  private clientSecret: string = environment.clientSecret;
  private rootUrl: string = "https://api.spotify.com";
  private albumsUrl: string = "";

  constructor(private http: HttpClient) { }


  // getAuth() will run once the user reaches the Home Component... 
  // will eventually change to once the user signs in, getAuth() will run to allow access to Spotify
  getAuth() {
    let headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(this.clientId + ":" + this.clientSecret))
      .set('Content-Type', 'application/x-www-form-urlencoded');

    let params: HttpParams = new HttpParams()
      .set('grant_type', 'client_credentials');
    let body = params.toString();
    

    return this.http.post<AccessToken>('https://accounts.spotify.com/api/token', 
      body, 
      { headers: headers });
  }


  searchMusic(query: string, type = 'artist', authToken: string): Observable<Artists> {
    
    let searchUrl = `${this.rootUrl}/v1/search?query=` + query + '&offset=0&limit=20&type=' + type + '&market=US';

    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + authToken);

    return this.http.get<Artists>(searchUrl, { headers: headers })
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred:", error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError("Something bad happened; please try again later.");
  }


  getAlbums(id: string, authToken: string) {
    let headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + authToken);

    this.albumsUrl = `${this.rootUrl}/v1/artists/` + id + '/albums?limit=30';

    return this.http.get<AlbumResults>(this.albumsUrl, { headers: headers });
  }
}
