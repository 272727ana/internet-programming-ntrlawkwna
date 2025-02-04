import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  movieForm!: FormGroup;

  constructor(private fb: FormBuilder, private movieService: MovieService) {}

  ngOnInit(): void {
    console.log('AddMovieComponent initialized');
    this.initForm();
  }

  private initForm(): void {
    this.movieForm = this.fb.group({
      title: [''],
      year: [''],
      director: [''],
      plot: [''],
      genre: [[]],
      rating: ['']
    });
  }  

  onSubmit(): void {
    if (this.movieForm.valid) {
      this.movieService.createMovie(this.movieForm.value).subscribe(
        (data) => {
          console.log('Movie created successfully:', data);
          window.history.back()
        },
        (error) => {
          console.error('Error creating movie:', error);
        }
      );
    }
  }
}
