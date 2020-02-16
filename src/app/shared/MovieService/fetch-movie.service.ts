import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FetchMovieService {
  //url for the movies 
  readonly url = 'http://localhost:4200/assets/api_data/movies.json';

  constructor(private http:HttpClient) { }

  getAllMovies(){
return this.http.get(this.url);
  }




}
