import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserLogin } from '../../../model/user-login';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit, OnDestroy {
  // ????
  title: string = 'User-Login';
  userLogin: UserLogin = new UserLogin();
  subscription!: Subscription;
  user!: User;
  message: string = '';

  constructor(
    private userSvc: UserService,
    private router: Router,
    private sysSvc: SystemService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login() {
    // call the user userService.login(this.userLogin)
    // expected results????
    // - invalid stuff: invalid login - message displayed
    // - correct stuff: success login - forward to movie list component
    this.subscription = this.userSvc.login(this.userLogin).subscribe({
      next: (resp) => {
        // successful login
        this.sysSvc.loggedInUser = resp;
        // nav to movie-list
        this.router.navigateByUrl('/movie-list');
      },
      error: (err) => {
        // unsuccessful login
        this.message = 'Invalid login - bad username/pwd combo';
      },
    });
  }
}
