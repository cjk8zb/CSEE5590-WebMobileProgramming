import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YandexTranslateService {

  private baseUrl = 'https://translate.yandex.net/api/v1.5/tr.json';

  constructor(private http: HttpClient) { }

  private static toParams(parameters: { [param: string]: string }) {
    return Object.assign(parameters, {key: environment.yandex.apiKey});
  }

  public translate(text: string, lang: string): Promise<string> {
    const params = YandexTranslateService.toParams({text, lang});
    return this.http.get(`${this.baseUrl}/translate`, {params})
      .pipe(map(parseResults)).toPromise();
  }

  public getLangs(ui: string = 'en'): Promise<Languages> {
    const params = YandexTranslateService.toParams({ui});
    return this.http.get(`${this.baseUrl}/getLangs`, {params})
      .pipe(map(parseLangs)).toPromise();
  }

}

function parseResults(results): string {
  if (!(results && results.text && Array.isArray(results.text) && results.text.length)) {
    return '';
  }
  return results.text[0];
}


function parseLangs(results): Languages {
  if (!(results && results.langs)) {
    return {};
  }
  return results.langs;
}

export interface Languages {
  [key: string]: string;
}
