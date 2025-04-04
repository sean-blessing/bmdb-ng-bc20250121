import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Actor } from '../../../model/actor';
import { ActorService } from '../../../service/actor.service';

@Component({
  selector: 'app-actor-detail',
  standalone: false,
  templateUrl: './actor-detail.component.html',
  styleUrl: './actor-detail.component.css'
})
export class ActorDetailComponent implements OnInit, OnDestroy{
  title: string = 'Actor-Detail';
  actorId!: number;
  actor!: Actor;
  subscription!: Subscription;

  constructor(
    private actorSvc: ActorService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}
  
ngOnInit(): void {
      // get the actorId from the URL
      this.actRoute.params.subscribe((parms) => {
        this.actorId = parms['id'];
        // get the actor for the id
        this.subscription = this.actorSvc.getById(this.actorId).subscribe({
          next: (resp) => {
            this.actor = resp;
          },
          error: (err) => {
            console.log('Error retrieving actor: ', err);
          },
        });
      });
}
ngOnDestroy(): void {
  this.subscription.unsubscribe();
}

delete() {
  this.actorSvc.delete(this.actorId).subscribe({
    next: (resp) => {
      this.router.navigateByUrl('/actor-list');
    },
    error: (err) => {
      console.log(err);
    }
});
}

}
