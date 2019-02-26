import { TestBed } from '@angular/core/testing';

import { YandexTranslateService } from './yandex-translate.service';

describe('YandexTranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YandexTranslateService = TestBed.get(YandexTranslateService);
    expect(service).toBeTruthy();
  });
});
