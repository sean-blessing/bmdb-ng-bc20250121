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

@NgModule({
  declarations: [
    AppComponent,
    MovieListComponent,
    MovieCreateComponent,
    NotFoundComponent,
    MovieEditComponent,
    MovieDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
