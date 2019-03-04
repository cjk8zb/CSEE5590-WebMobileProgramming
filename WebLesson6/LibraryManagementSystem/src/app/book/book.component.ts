import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {DataSource} from '@angular/cdk/collections';
import {NavigationService} from '../navigation.service';
import {NavigationAction} from '../navigation-action';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  books: any;
  displayedColumns = ['isbn', 'title', 'author'];
  dataSource = new BookDataSource(this.api);

  constructor(private api: ApiService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.navigationService.setRightAction(new NavigationAction('add', ['books', 'new']));
    this.api.getBooks()
      .subscribe(res => {
        console.log(res);
        this.books = res;
      }, err => {
        console.log(err);
      });
  }

}

export class BookDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}
