import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RestaurantsComponent} from './restaurants/restaurants.component';
import {TranslateComponent} from './translate/translate.component';

const routes: Routes = [
  {path: 'restaurants', component: RestaurantsComponent},
  {path: 'translate', component: TranslateComponent},
  {path: '', pathMatch: 'full', redirectTo: 'restaurants'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
