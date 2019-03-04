import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {NavigationAction} from './navigation-action';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private leftActionSource = new Subject<NavigationAction>();
  private rightActionSource = new Subject<NavigationAction>();

  leftAction$ = this.leftActionSource.asObservable();
  rightAction$ = this.rightActionSource.asObservable();

  setLeftAction(action: NavigationAction) {
    this.leftActionSource.next(action);
  }

  setRightAction(action: NavigationAction) {
    this.rightActionSource.next(action);
  }

}
