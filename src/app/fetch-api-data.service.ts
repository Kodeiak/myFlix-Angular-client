import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
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
    return this.http
      .post(apiUrl + "login?Username=" + userDetails.username + "&Password=" + userDetails.password, userDetails )
      .pipe(catchError(this.handleError)
    );
  }

  // Get all movies
  public getMovies(): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "movies", {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      })
      .pipe(catchError(this.handleError)
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
    const token = localStorage.getItem("token");
    return this.http
      .get(apiUrl + "users/" + username, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Add a movie to favorite Movies
  public addFavorite(movieID: any, username: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .put(apiUrl + "users/" + username + "/movies/" + movieID, undefined, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Edit user
  public updateUser(username: string, userDetails: object): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .put(apiUrl + "users/" + username, userDetails, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete user 
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .delete(apiUrl + "users/" + username, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      })
      .pipe(
        catchError(this.handleError)
      );
  }
  // Delete a movie from the favorite movies
  public deleteFavorite(username: string, movieID: any): Observable<any> {
    const token = localStorage.getItem("token");
    return this.http
      .delete(apiUrl + "users/" + username + "/movies/" + movieID, {
        headers: new HttpHeaders({
          Authorization: "Bearer " + token,
        })
      })
      .pipe(
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




