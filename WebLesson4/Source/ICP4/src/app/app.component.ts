import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ICP 4';

  pages = [
    {route: 'calculator', title: 'Calculator'},
    {route: 'todo', title: 'To Do List'}
  ];
}
