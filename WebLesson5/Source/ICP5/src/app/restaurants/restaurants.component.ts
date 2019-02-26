import {Component} from '@angular/core';
import {FoursquareService, UserLocation, Venue} from './foursquare.service';
import {MatCheckboxChange} from '@angular/material';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.scss']
})
export class RestaurantsComponent {

  currentLocation?: UserLocation = null;
  restaurants: Array<Venue> = [];
  query = '';
  near = '';
  determiningLocation = false;
  errorMessage = '';

  get isGeoLocationAvailable() {
    return Boolean(navigator.geolocation);
  }

  get columnsToDisplay() {
    if (!this.currentLocation) {
      return ['name', 'address'];
    }
    return ['name', 'address', 'distance'];
  }

  constructor(private foursquare: FoursquareService) { }

  async search() {
    const query = this.query;
    const near = this.near;
    const location = this.currentLocation;

    this.restaurants = await this.foursquare.search({query, near, location});
  }

  async toggleUseCurrentLocation(event: MatCheckboxChange) {
    if (event.checked) {
      this.determiningLocation = true;
      try {
        this.currentLocation = await this.getCurrentLocation();
        this.near = null;
      } catch (error) {
        this.currentLocation = null;
        this.errorMessage = error.message;
      }
      this.determiningLocation = false;
    } else {
      this.currentLocation = null;
    }

    event.source.checked = Boolean(this.currentLocation);
  }

  getCurrentLocation(): Promise<UserLocation> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(({coords}) => resolve(coords), reject);
    });
  }

}
