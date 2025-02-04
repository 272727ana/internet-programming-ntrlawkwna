import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/${id}`);
  }

  createMovie(movie: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/movies`, movie);
  }

  updateMovie(id: number, movie: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/movies/${id}`, movie);
  }

  deleteMovie(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/movies/${id}`);
  }

  getGenres(): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres`);
  }

  getActors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actors`);
  }

  getActor(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actors/${id}`);
  }

  searchActorByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/actors?name=${name}`);
  }
}