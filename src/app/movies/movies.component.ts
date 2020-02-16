import { Component, OnInit } from '@angular/core';
import { FetchMovieService } from '../shared/MovieService/fetch-movie.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  allMovies: any;
  filterText: any;
  genres: any = [];
  tagss: any = [];
  duplicate: any;
  nodata = false;
  genresList: any;
  p=1;
  constructor(private getMoviesService: FetchMovieService) { }
  ngOnInit() {
    this.getAllMovies();
  }
// get the movies using the api for json since there was a cors policy eroor
  getAllMovies() {
    this.getMoviesService.getAllMovies().subscribe((data: any) => {
      this.allMovies = data;
      this.duplicate = this.allMovies;
      this.genresList = this.allMovies;
      let lookup = {};
      let items = data;
      let result = [];


      for (let i = 0; i < items.length; i++) {
        let name = items[i].genres.split('|');
        name.forEach(element => {
          if (!(element in lookup)) {
            lookup[element] = 1;
            result.push(element);
          }
        });

      }
      this.genres = result;
    });
  }
//function for filtering the data by genres and search
  tags(data: any) {
    //check if it is a search call or filter call for genres
    if (data != 1) {
      if (data.style.backgroundColor == 'green') {
        data.style.backgroundColor = "blue";
      }
      else {
        data.style.backgroundColor = "green";
      }
      const index: number = this.tagss.indexOf(data.value);
      if (index !== -1) {
        this.tagss.splice(index, 1);
      }
      else {
        this.tagss.push(data.value);

      }
    }
    //filter by genres
    if (this.tagss.length > 0) {
      this.allMovies = [];
      for (let i = 0; i < this.genresList.length; i++) {
        let parent = this.genresList[i];
        for (let j = 0; j < this.tagss.length; j++) {
          let element = this.tagss[j];
          if (parent['genres'].includes(element)) {
            this.allMovies.push(parent);
            break;
          }
        }
      }
      this.genresList = this.allMovies;
    }
    else {
      this.allMovies = this.duplicate;
      this.genresList = this.allMovies;
    }
//search functionality
    var movies = this.genresList;
    if (this.filterText == null || this.filterText == "") {
      this.allMovies = this.genresList;
    }
    else {
      this.allMovies = [];
      movies.forEach(element => {
        if (element['movie_title'].toLowerCase().startsWith(this.filterText)) {
          this.allMovies.push(element);
        }
      });


    }
    //no results 
    if (this.allMovies.length == 0) {
      this.nodata = true;
    }
    else{
      this.nodata = false;
    }
  }
//sort the data based on the budget, title_year and rating in descending order
sort(data:any){
  if (data.style.backgroundColor == 'green') {
    data.style.backgroundColor = "blue";
  }
  else {
    data.style.backgroundColor = "green";
  }
  if(data.value == 1){
    this.allMovies = this.allMovies.sort((n1,n2) => {
      if (n1.budget < n2.budget) {
          return 1;
      }
      if (n1.budget > n2.budget) {
          return -1;
      }
      return 0;
  })
}
  else if(data.value == 2){
    this.allMovies = this.allMovies.sort((n1,n2) => {
      if (n1.content_rating < n2.content_rating) {
          return 1;
      }
      if (n1.content_rating > n2.content_rating) {
          return -1;
      }
      return 0;
  })
  }
  else{
    this.allMovies = this.allMovies.sort((n1,n2) => {
      if (n1.title_year < n2.title_year) {
          return 1;
      }
      if (n1.title_year > n2.title_year) {
          return -1;
      }
      return 0;
  })
  }
  this.genresList = this.allMovies;

}
//refresh all the filters
refresh()
{
location.reload()}
//scroll Top
gotop(data:any){
  window.scrollTo({top:50,behavior:"smooth"});
}

}

