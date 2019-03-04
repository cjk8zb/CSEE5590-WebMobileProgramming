import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './book/book.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BookCreateComponent} from './book-create/book-create.component';
import {BookEditComponent} from './book-edit/book-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {NavigationService} from './navigation.service';

const appRoutes: Routes = [
  {
    path: 'books',
    component: BookComponent,
    data: {title: 'Book List'}
  },
  {
    path: 'books/new',
    component: BookCreateComponent,
    data: {title: 'Create Book'}
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
    data: {title: 'Book Details'}
  },
  {
    path: 'books/:id/edit',
    component: BookEditComponent,
    data: {title: 'Edit Book'}
  },
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatFormFieldModule
  ],
  providers: [
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
