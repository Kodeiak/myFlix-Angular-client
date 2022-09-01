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

  /**
   * Called on load - calls API method to get movie data
   * @returns movie data
   */
  getMovies(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens dialog with genre details
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: "500px"
    })
  }

  /**
   * Opens dialog with director details 
   * @param name
   * @param description 
   */
  openDirectorDialog(name: string, description: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: "500px"
    })
  }

  /**
   * Opens dialog with movie description
   * @param description - of movie
   */
  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Description: description
      },
      width: "500px"
    })
  }

  /**
   * Calls function to add or remove movie from favorites as appropriate
   * @param id - movie ID
   */
  toggleFavorite(id: any): void {
    if (this.favoriteMovies.indexOf(id) > -1) {
      this.deleteFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  /**
   * Adds movie to favorites
   * @param id - movie ID
   */
  addFavorite(id: any): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.addFavorite(id, username).subscribe((resp: any) => {
      // add to favorite list
      this.favoriteMovies.push(id);
    });
  }

  /**
   * Deletes move from favorites
   * @param id - movie ID
   */
  deleteFavorite(id: any): void {
    const username = localStorage.getItem("user") || "";
    this.fetchApiData.deleteFavorite(username, id).subscribe((resp: any) => {
      // remove from favorite list
      this.favoriteMovies = this.favoriteMovies.filter(movie => movie !== id);
    });
  }
}
