import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Credit } from '../../../model/credit';
import { CreditService } from '../../../service/credit.service';

@Component({
  selector: 'app-credit-detail',
  standalone: false,
  templateUrl: './credit-detail.component.html',
  styleUrl: './credit-detail.component.css'
})
export class CreditDetailComponent implements OnInit, OnDestroy {
  title: string = 'Credit Edit';
  creditId!: number;
  credit!: Credit;
  subscription!: Subscription;

  constructor(
    private creditSvc: CreditService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.actRoute.params.subscribe((parms) => {
      this.creditId = parms['id'];
    });

    this.subscription = this.creditSvc.getById(this.creditId).subscribe({
      next: (resp) => {
        this.credit = resp;
      },
      error: (err) => {
        console.error('Error retrieving credit: ', err);
      },
    });
  }

  delete() {
    this.subscription = this.creditSvc.delete(this.creditId).subscribe({
      next: (resp) => {
        this.credit = resp as Credit;
        this.router.navigateByUrl('/credit-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
