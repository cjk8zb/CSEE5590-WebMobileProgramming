import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {NavigationService} from '../navigation.service';
import {NavigationAction} from '../navigation-action';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {

  bookForm: FormGroup;

  constructor(private router: Router,
              private api: ApiService,
              private formBuilder: FormBuilder,
              private navigationService: NavigationService) {
    navigationService.setLeftAction(new NavigationAction('arrow_back', 'books'));
  }

  ngOnInit() {
    this.bookForm = this.formBuilder.group({
      isbn: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      author: [null, Validators.required],
      publisher: [null, Validators.required],
      published_year: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
        const id = res['_id'];
        return this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
