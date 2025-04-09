import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from '../../../model/movie';
import { Credit } from '../../../model/credit';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../../service/movie.service';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-movie-credits',
  standalone: false,
  templateUrl: './movie-credits.component.html',
  styleUrl: './movie-credits.component.css',
})
export class MovieCreditsComponent implements OnInit, OnDestroy {
  title: string = 'Movie-Credits';
  subscription!: Subscription;
  movieId: number = 0;
  movie!: Movie;
  movies!: Movie[];
  credits!: Credit[];

  constructor(
    private actRoute: ActivatedRoute,
    private movieSvc: MovieService,
    private creditSvc: CreditService
  ) {}

  ngOnInit(): void {
    // 1 - get the movieId from the url
    // 2 - get the movie for the movieId
    // 3 - get a list of movies
    // 4 - get the credits for the movieId
    // * we gotta do these in order! 1, then 2, then 3 and 4
    this.actRoute.params.subscribe((parms) => {
      this.movieId = parms['id'];
      this.subscription = this.movieSvc.getById(this.movieId).subscribe({
        next: (resp) => {
          this.movie = resp;
          console.log('MCC.movie - ', this.movie);
        },
        error: (err) => {
          console.log('Error retrieving movie: ', err);
        },
      });
      this.subscription = this.creditSvc
        .getCreditsForMovieId(this.movieId)
        .subscribe({
          next: (resp) => {
            this.credits = resp;
            console.log('MCC.credits - ', this.credits);
          },
          error: (err) => {
            console.log('Error retrieving credits for movie: ', err);
          },
        });
    });
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
        console.log('MCC.movies - ', this.movies);
      },
      error: (err) => {
        console.log('Error retrieving movies: ', err);
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id == b.id;
  }

  refreshCredits() {
    this.subscription = this.creditSvc
      .getCreditsForMovieId(this.movie.id)
      .subscribe({
        next: (resp) => {
          this.credits = resp;
          console.log('MCC.credits - ', this.credits);
        },
        error: (err) => {
          console.log('Error retrieving credits for movie: ', err);
        },
      });
  }
}
