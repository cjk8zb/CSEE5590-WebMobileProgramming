import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {Book} from '../book';
import {NavigationService} from '../navigation.service';
import {NavigationAction} from '../navigation-action';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  book: Book;

  constructor(private route: ActivatedRoute,
              private api: ApiService,
              private router: Router,
              private navigationService: NavigationService) {
    navigationService.setLeftAction(new NavigationAction('arrow_back', 'books'));
    navigationService.setRightAction(new NavigationAction('edit', ['books', route.snapshot.params['id'], 'edit']));
  }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params['id']);
  }

  getBookDetails(id) {
    this.api.getBook(id).subscribe(data => this.book = data);
  }

  deleteBook(id) {
    this.api.deleteBook(id).subscribe(() => this.router.navigate(['/books']), (err) => console.log(err));
  }

}
