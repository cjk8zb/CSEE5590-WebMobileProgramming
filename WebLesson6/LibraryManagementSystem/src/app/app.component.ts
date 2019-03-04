import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationService} from './navigation.service';
import {NavigationAction} from './navigation-action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  leftActions: NavigationAction[] = [];
  rightActions: NavigationAction[] = [];

  constructor(public navigationService: NavigationService) {

    navigationService.leftAction$.subscribe(
      action => {
          this.leftActions.push(action);
      }
    );

    navigationService.rightAction$.subscribe(
      action => {
          this.rightActions.push(action);
      }
    );
    // navigationService.onChange.subscribe(() => {
    //   this.leftAction = navigationService.leftAction;
    //   this.rightAction = navigationService.rightAction;
    // });
    console.log('navigationService', navigationService);
  }

  getTitle(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['title'] || 'Library Management System';
  }

  resetNavigation() {
    while (this.leftActions.pop()) {}
    while (this.rightActions.pop()) {}
  }
}
