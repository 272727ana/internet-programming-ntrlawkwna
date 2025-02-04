import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    console.log('StatisticsComponent initialized');
    
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
    });
  }
  
  // Calculate the average rating of movies
  getAverageRating(): number {
    const totalRating = this.movies.reduce((sum, movie) => sum + movie.rating, 0);
    return totalRating / this.movies.length;
  }

  // Get the number of movies in a specific genre
  getMoviesByGenre(genre: string): number {
    return this.movies.filter(movie => movie.genre.includes(genre)).length;
  }

  // Get the highest rated movie
  getHighestRatedMovie(): any {
    return this.movies.reduce((max, movie) => (movie.rating > max.rating ? movie : max), this.movies[0]);
  }

  // Get the number of movies per year
  getMoviesPerYear(): { [year: number]: number } {
    return this.movies.reduce((acc, movie) => {
      acc[movie.year] = (acc[movie.year] || 0) + 1;
      return acc;
    }, {});
  }
}
