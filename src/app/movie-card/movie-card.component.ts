import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  movies: any[] = []
  favoriteMovies: any[] = []
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: "500px"
    })
  }

  openDirectorDialog(name: string, description: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: "500px"
    })
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Description: description
      },
      width: "500px"
    })
  }

  toggleFavorite(id: any): void {
    console.log("add or remove favorite");
    if (this.favoriteMovies.indexOf(id) > -1) {
      this.deleteFavorite(id);
    } else {
      this.addFavorite(id);
    }
    // check current icon value
    // if in favorites list, call removeFavorite and set icon to favorite_border
    // if not in favorites list, call addFavorite and set icon to favorite
  }

  addFavorite(id: any): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.addFavorite(id, username).subscribe((resp: any) => {
      console.log(resp);
      // add to favorite list
      this.favoriteMovies.push(id);
      console.log(this.favoriteMovies);
      // change icon
    });
  }

  deleteFavorite(id: any): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.deleteFavorite(username, id).subscribe((resp: any) => {
      console.log(resp);
      // remove from favorite list
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie !== id);
      console.log(this.favoriteMovies);
      // change icon
    });
  }
}
