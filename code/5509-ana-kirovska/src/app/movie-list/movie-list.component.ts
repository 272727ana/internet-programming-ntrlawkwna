import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = [];
  movieToDeleteId: number | null = null;

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit(): void {
    console.log('MovieListComponent initialized');
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }

  viewMovie(id: number): void {
    this.router.navigate(['/movies', id]);
  }
  
  editMovie(id: number): void {
    this.router.navigate(['/movies', id, 'edit']);
  }

  setMovieIdToDelete(movieId: number): void {
    this.movieToDeleteId = movieId;
  }

  deleteMovie(): void {
    if (this.movieToDeleteId !== null) {
      this.movieService.deleteMovie(this.movieToDeleteId).subscribe(() => {
        this.movies = this.movies.filter((movie) => movie.id !== this.movieToDeleteId);
        this.movieToDeleteId = null;  // Reset movie ID after deletion
      });
    }
  }

  createMovie(): void {
    this.router.navigate(['/movies', 'create']);
  }
}
