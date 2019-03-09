import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';

import {ApiService} from '../api.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  submitted = false;
  customer = {};

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) {
  }

  get f(): any {
    return this.customerForm.controls;
  }

  get name(): any {
    return (this.f.name as FormGroup).controls;
  }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      name: this.formBuilder.group({
        first: ['', Validators.required],
        last: ['', Validators.required]
      }),
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      lastContact: ['', Validators.required],
      customerLifetimeValue: ['', Validators.required],
    });
    this.getCustomer(this.route.snapshot.params['id']);
  }

  getCustomer(id) {
    /*** Get the Customer Details*/
    this.api.getCustomer(id)
      .subscribe(data => {
        if (data && data.birthday) {
          data.birthday = new Date(data.birthday);
          data.lastContact = new Date(data.lastContact);
        }
        console.log('Customer', data);
        this.customer = data;
        this.customerForm.patchValue(this.customer);
      });
  }

  onFormSubmit() {
    const id = this.route.snapshot.params['id'];
    /*** On form submit update the customer details*/
    const data = this.customerForm.value;
    console.log('update data:', data);
    this.api.updateCustomer(id, data)
      .subscribe(res => {
        this.router.navigate(['/customer-details', id]);
      }, (err) => {
        console.log(err);
      });

  }

  onReset() {
    this.submitted = false;
    this.customerForm.reset();
  }
}
