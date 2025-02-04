import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: any;
  movieToDeleteId: number | null = null;

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
  
  openDeleteModal(id: number): void {
    this.movieToDeleteId = id;
  }

  deleteMovie(): void {
    if (this.movieToDeleteId !== null) {
      this.movieService.deleteMovie(this.movieToDeleteId).subscribe(() => {
        this.router.navigate(['/movies']);
      });
    }
  }
}
