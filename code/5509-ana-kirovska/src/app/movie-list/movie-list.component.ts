import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})

export class MovieListComponent implements OnInit {
[x: string]: any;
  movies: any[] = [];

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
  
  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe(() => {
        this.movies = this.movies.filter((movie) => movie.id !== id);
      });
    }
  }

  createMovie(): void {
    this.router.navigate(['/movies', 'create']);
  }
}