import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const apiUrl = "https://myflixdb-kodeiak.herokuapp.com/";
@Injectable({
  // make this service available everywhere
  providedIn: 'root'
})
export class FetchApiDataService {
  // provide HttpClient to entire class making it available through this.http
  constructor(private http: HttpClient) {
   }

  // post user registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "users", userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // post user login
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + "login", userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  public getMovies(): Observable<any> {
    return this.http.get(apiUrl + "movies").pipe(
      catchError(this.handleError)
    );
  }

  // Get one movie
  public getMovieDetails(title: string): Observable<any> {
    console.log(title);
    return this.http.get(apiUrl + "movies/" + title).pipe(
      catchError(this.handleError)
    );
  }

  // Get director
  public getDirector(director: string): Observable<any> {
    console.log(director);
    return this.http.get(apiUrl + "movies/director/" + director).pipe(
      catchError(this.handleError)
    );
  }
  // Get genre
  public getGenre(genre: string): Observable<any> {
    console.log(genre);
    return this.http.get(apiUrl + "movies/genre/" + genre).pipe(
      catchError(this.handleError)
    );
  }

  // Get user by username
  public getUser(username: string): Observable<any> {
    console.log(username);
    return this.http.get(apiUrl + "users/" + username).pipe(
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite Movies
  public addFavorite(movieID: any, username: string): Observable<any> {
    return this.http.put(apiUrl + "user/" + username + "/movies/" + movieID, undefined).pipe(
      catchError(this.handleError)
    );
  }

  // Edit user
  public updateUser(username: string, userDetails: object): Observable<any> {
    console.log(userDetails)
    return this.http.put(apiUrl + "user/" + username, userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Delete user 
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(apiUrl + "user/" + username).pipe(
      catchError(this.handleError)
    );
  }
  // Delete a movie from the favorite movies
  public deleteFavorite(username: string, movieID: any): Observable<any> {
    return this.http.delete(apiUrl + "user/" + username + "/movies/" + movieID).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`
      );
    }
    return throwError(
      "Something bad happened: please try again later"
    );
  }
}




