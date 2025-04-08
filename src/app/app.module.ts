import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieListComponent } from './feature/movie/movie-list/movie-list.component';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { MovieCreateComponent } from './feature/movie/movie-create/movie-create.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { MovieEditComponent } from './feature/movie/movie-edit/movie-edit.component';
import { MovieDetailComponent } from './feature/movie/movie-detail/movie-detail.component';
import { ActorListComponent } from './feature/actor/actor-list/actor-list.component';
import { ActorCreateComponent } from './feature/actor/actor-create/actor-create.component';
import { ActorEditComponent } from './feature/actor/actor-edit/actor-edit.component';
import { ActorDetailComponent } from './feature/actor/actor-detail/actor-detail.component';
import { MenuComponent } from './core/menu/menu.component';
import { CreditListComponent } from './feature/credit/credit-list/credit-list.component';
import { CreditCreateComponent } from './feature/credit/credit-create/credit-create.component';
import { CreditDetailComponent } from './feature/credit/credit-detail/credit-detail.component';
import { CreditEditComponent } from './feature/credit/credit-edit/credit-edit.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { MovieCreditsComponent } from './feature/movie/movie-credits/movie-credits.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    NotFoundComponent,
    MovieEditComponent,
    MovieDetailComponent,
    ActorListComponent,
    ActorCreateComponent,
    ActorEditComponent,
    ActorDetailComponent,
    MenuComponent,
    CreditListComponent,
    CreditCreateComponent,
    CreditDetailComponent,
    CreditEditComponent,
    UserLoginComponent,
    MovieCreditsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
