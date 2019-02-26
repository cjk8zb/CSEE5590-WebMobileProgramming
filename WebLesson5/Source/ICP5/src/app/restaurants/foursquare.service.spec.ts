import { TestBed } from '@angular/core/testing';

import { FoursquareService } from './foursquare.service';

describe('FoursquareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoursquareService = TestBed.get(FoursquareService);
    expect(service).toBeTruthy();
  });
});
