import {Component, OnInit} from '@angular/core';
import {Languages, YandexTranslateService} from './yandex-translate.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {

  langs: Languages = {};
  text = '';
  results = '';
  from = '';
  to = '';

  constructor(private yandex: YandexTranslateService) { }

  async ngOnInit() {
    this.langs = await this.yandex.getLangs();
  }

  async translate() {
    this.results = await this.yandex.translate(this.text, `${this.from}-${this.to}`);
  }
}
