import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../model/actor';
import { Credit } from '../../../model/credit';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorService } from '../../../service/actor.service';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-actor-filmography',
  standalone: false,
  templateUrl: './actor-filmography.component.html',
  styleUrl: './actor-filmography.component.css',
})
export class ActorFilmographyComponent implements OnInit, OnDestroy {
  title: string = 'Actor-Filmography';
  actorId: number = 0;
  actor!: Actor;
  credits!: Credit[];
  subscription!: Subscription;

  constructor(
    private actRoute: ActivatedRoute,
    private actorSvc: ActorService,
    private creditSvc: CreditService
  ) {}

  ngOnInit(): void {
    // what are we gonna do here?
    // 1 - get actorId from URL
    this.actRoute.params.subscribe((parms) => {
      this.actorId = parms['id'];
      console.log('ActorID retrieved', this.actorId);
      // 2a - get credits for actorId
      this.subscription = this.creditSvc
        .getCreditsForActorId(this.actorId)
        .subscribe({
          next: (resp) => {
            this.credits = resp;
            console.log('Credits retrieved!', this.credits);
          },
          error: (err) => {
            console.log('Error getting actor filmography', err);
          },
        });
  
      // 2b - get actor for actorId
      this.subscription = this.actorSvc.getById(this.actorId).subscribe({
        next: (resp) => {
          this.actor = resp;
          console.log('Actor retrieved!', this.actor);
        },
        error: (err) => {
          console.log('Error getting actor for id', err);
        },
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
