import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from '../api.service';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {NavigationService} from '../navigation.service';
import {NavigationAction} from '../navigation-action';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  bookForm: FormGroup;
  id = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: ApiService,
              private formBuilder: FormBuilder,
              private navigationService: NavigationService) {
    navigationService.setLeftAction(new NavigationAction('arrow_back', ['books', route.snapshot.params['id']]));
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.bookForm = this.formBuilder.group({
      isbn: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      author: [null, Validators.required],
      publisher: [null, Validators.required],
      published_year: [null, Validators.required]
    });
    this.getBookDetails();
  }

  getBookDetails() {
    this.api.getBook(this.id).subscribe(data => this.bookForm.patchValue(data));
  }

  onFormSubmit(form: NgForm) {
    this.api.updateBook(this.id, form)
      .subscribe(res => {
        const id = res['_id'];
        return this.router.navigate(['/book-details', id]);
      }, (err) => {
        console.log(err);
      });
  }
}
