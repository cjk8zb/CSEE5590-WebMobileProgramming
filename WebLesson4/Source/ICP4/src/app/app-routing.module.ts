import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CalculatorComponent} from './calculator/calculator.component';
import {ToDoComponent} from './to-do/to-do.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'calculator'},
  {path: 'calculator', component: CalculatorComponent},
  {path: 'todo', component: ToDoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
