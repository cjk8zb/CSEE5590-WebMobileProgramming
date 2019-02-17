import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalculatorComponent} from './calculator/calculator.component';
import {ToDoComponent} from './to-do/to-do.component';
import { OcticonDirective } from './octicon/octicon.directive';
import {AngularFittextModule} from 'angular-fittext';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ToDoComponent,
    OcticonDirective
  ],
  imports: [
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFittextModule,
    AppRoutingModule
  ],
  providers: [
    OcticonDirective],
  bootstrap: [AppComponent]
})
export class AppModule {}
