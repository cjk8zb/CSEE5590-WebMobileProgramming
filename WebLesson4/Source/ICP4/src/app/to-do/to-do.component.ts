import {Component, OnInit} from '@angular/core';
import {ToDoItem} from './to-do-item';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {

  public tasks: ToDoItem[] = [];

  constructor() { }

  ngOnInit() {
    // Seed data:
    [
      {name: 'Something', complete: false},
      {name: 'Something Else', complete: true},
      {name: 'Not Something', complete: true},
      {name: 'Not Something Else', complete: false},
    ].forEach(({name, complete}) => {
      this.tasks.push(new ToDoItem(name, complete));
    });
  }

  addItem(input: HTMLInputElement) {
    const item = input.value || '';
    input.value = null;
    input.blur();
    console.log('e', item);
    if (item.length) {
      // this.tasks.unshift(new ToDoItem(item));
      this.tasks.push(new ToDoItem(item));
    }
  }

  delete(i: number) {
    if (i >= 0) {
      this.tasks.splice(i, 1);
    }
  }
}
