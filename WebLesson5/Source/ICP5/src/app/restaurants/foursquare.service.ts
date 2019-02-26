import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoursquareService {

  constructor(private http: HttpClient) { }

  private static toParams(parameters: SearchParameters): { [param: string]: string } {
    const params: { [param: string]: string } = {
      client_id: environment.foursquare.clientId,
      client_secret: environment.foursquare.clientSecret,
      v: '20190223',
      /// Food - @see https://developer.foursquare.com/docs/resources/categories
      categoryId: '4d4b7105d754a06374d81259',
      query: parameters.query
    };

    if (parameters.limit) {
      params.limit = parameters.limit.toString();
    }
    if (parameters.location && parameters.location.latitude) {
      params.ll = `${parameters.location.latitude},${parameters.location.longitude}`;
    }
    if (parameters.near) {
      params.near = parameters.near;
    }
    if (parameters.intent) {
      params.intent = parameters.intent;
    }
    if (parameters.radius) {
      params.radius = parameters.radius.toString();
    }

    return params;
  }

  public search(parameters: SearchParameters): Promise<Array<Venue>> {
    const params = FoursquareService.toParams(parameters);
    return this.http.get('https://api.foursquare.com/v2/venues/search', {params})
      .pipe(map(parseSearchResults)).toPromise();
  }
}

function parseSearchResults(results): Array<Venue> {
  if (!(results && results.response && results.response.venues && Array.isArray(results.response.venues))) {
    return [];
  }

  return results.response.venues.map(parseVenue).filter(Boolean);
}

function parseVenue(json): Venue {
  if (!(json && json.name)) {
    return null;
  }

  return new Venue(json);
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface SearchParameters {
  query: string;
  limit?: number;
  location?: UserLocation;
  near?: string;
  intent?: string;
  radius?: number;
}

export class Venue {
  name: string;
  location: { address: string, distance?: number };

  constructor(json) {
    Object.assign(this, json);
  }
}
