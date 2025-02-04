import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {
  movieForm!: FormGroup;

  constructor(private fb: FormBuilder, private movieService: MovieService) {}

  ngOnInit(): void {
    console.log('MovieCreateComponent initialized');
    this.initForm();
  }
  
  private initForm(): void {
    this.movieForm = this.fb.group({
      title: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      director: ['', Validators.required],
      plot: ['', Validators.required],
      genre: [[], Validators.required],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.movieService.createMovie(this.movieForm.value).subscribe(
        (data) => {
          console.log('Movie created successfully:', data);
        },
        (error) => {
          console.error('Error creating movie:', error);
        }
      );
    }
  }
}
