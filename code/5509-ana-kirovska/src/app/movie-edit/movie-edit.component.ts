import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-edit',
  standalone: true,  // Specify the component as standalone if needed
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  movieForm!: FormGroup;
  movie: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;  // Ensure 'id' is being fetched correctly
    if (id) {
      this.movieService.getMovie(id).subscribe((data) => {
        this.movie = data;
        this.initForm();
      });
    }
  }

  private initForm(): void {
    this.movieForm = this.fb.group({
      title: [this.movie?.title || '', Validators.required],
      year: [this.movie?.year || '', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      director: [this.movie?.director || '', Validators.required],
      plot: [this.movie?.plot || '', Validators.required],
      genre: [this.movie?.genre || [], Validators.required],
      rating: [this.movie?.rating || '', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.movieService.updateMovie(this.movie.id, this.movieForm.value).subscribe(() => {
        console.log('Movie updated successfully');
        // Redirect back
        window.history.back();
      });
    }
  }
}
