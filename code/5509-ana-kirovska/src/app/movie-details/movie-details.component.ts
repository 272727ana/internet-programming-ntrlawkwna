import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})

export class MovieDetailsComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.movieService.getMovie(id).subscribe((data) => {
      this.movie = data;
    });
  }

  editMovie(id: number): void {
    this.router.navigate(['/movies', id, 'edit']);
  }
  
  deleteMovie(id: number): void {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.movieService.deleteMovie(id).subscribe(() => {
        this.router.navigate(['/movies']);
      });
    }
  }
}