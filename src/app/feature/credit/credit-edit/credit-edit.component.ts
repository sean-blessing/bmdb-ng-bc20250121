import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { Credit } from '../../../model/credit';
import { Movie } from '../../../model/movie';
import { ActorService } from '../../../service/actor.service';
import { CreditService } from '../../../service/credit.service';
import { MovieService } from '../../../service/movie.service';

@Component({
  selector: 'app-credit-edit',
  standalone: false,
  templateUrl: './credit-edit.component.html',
  styleUrl: './credit-edit.component.css'
})
export class CreditEditComponent implements OnInit, OnDestroy{
  title: string = 'Credit Edit';
  credit: Credit = new Credit();
  creditId!: number;
  subscription!: Subscription;
  movies: Movie[] = [];
  actors: Actor[] = [];

  constructor(
    private creditSvc: CreditService,
    private movieSvc: MovieService,
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // get creditId from the url, then get the credit
    this.actRoute.params.subscribe((parms) => {
      this.creditId = parms['id'];
      this.subscription = this.creditSvc.getById(this.creditId).subscribe({
        next: (resp) => {
          this.credit = resp;
        },
        error: (err) => {
          console.error("Error getting credit for id: "+this.creditId);
        }
      });
    });
    //populate list of movies
    this.subscription = this.movieSvc.list().subscribe({
      next: (resp) => {
        this.movies = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading movies.' + err.message
        );
      },
    });
    //populate list of actors
    this.subscription = this.actorSvc.list().subscribe({
      next: (resp) => {
        this.actors = resp;
      },
      error: (err) => {
        console.error(
          'Credit Create Error: error loading actors.' + err.message
        );
      },
    });
  }

  save() {
    this.subscription = this.creditSvc.update(this.credit).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.error('Error editing credit: ' + err.message);
      },
    });
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  compMovie(a: Movie, b: Movie): boolean {
    return a && b && a.id == b.id;
  }

  compActor(a: Actor, b: Actor): boolean {
    return a && b && a.id == b.id;
  }
}
