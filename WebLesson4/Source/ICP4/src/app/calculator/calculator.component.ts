import {AfterViewChecked, Component, ElementRef, ViewChild} from '@angular/core';
import {Expression} from './expression';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements AfterViewChecked {

  public output = '';
  @ViewChild('outputElement') outputElement: ElementRef<HTMLSpanElement>;
  @ViewChild('formElement') formElement: ElementRef<HTMLFormElement>;

  private expression = new Expression();

  ngAfterViewChecked(): void {
    // Resize font to fit output.
    const element = this.outputElement.nativeElement;
    const parent = element.parentElement;
    const view = parent.ownerDocument.defaultView;

    const style = view.getComputedStyle(element, null);
    const fontSize = parseFloat(style.fontSize);
    const elementWidth = parseFloat(style.width);

    const parentWidth = parseFloat(view.getComputedStyle(parent, null).width);

    const ratio = fontSize / elementWidth;
    const newSize = Math.max(Math.min(parentWidth * ratio, 92), 8);

    element.style.fontSize = `${newSize}px`;
  }

  clickHandler(event: MouseEvent) {
    if (!(event.target instanceof HTMLButtonElement)) {
      return;
    }

    const button: HTMLButtonElement = event.target;
    if (button.classList.contains('number')) {
      this.handleNumber(button);
    } else if (button.classList.contains('operator')) {
      this.handleOperator(button);
    } else if (button.classList.contains('modifier')) {
      this.handleModifier(button);
    }

    this.output = this.expression.toString();
  }

  private handleNumber(button: HTMLButtonElement) {
    if (this.expression.isEmpty()) {
      this.output = '';
    }

    let text = button.textContent;
    if (button.id === 'point') {
      if (this.output.includes('.')) {
        text = '';
      } else if (this.output.length === 0) {
        text = '0.';
      }
    }

    if (this.output && this.output !== '0') {
      this.output += text;
    } else {
      this.output = text;
    }

    this.expression.value = Number(this.output);
  }

  private handleOperator(button: HTMLButtonElement) {
    this.clearActive();
    if (button.id === 'equals') {
      this.expression = this.expression.apply();
    } else {
      button.classList.add('active');
      switch (button.id) {
        case 'divide':
          this.expression.operator = '/';
          break;

        case 'times':
          this.expression.operator = '*';
          break;

        case 'minus':
          this.expression.operator = '-';
          break;

        case 'plus':
          this.expression.operator = '+';
          break;
      }
    }
  }

  private handleModifier(button: HTMLButtonElement) {
    switch (button.id) {
      case 'clear':
        this.clearActive();
        this.expression = new Expression();
        break;

      case 'negate':
        this.expression.negate();
        break;

      case 'percent':
        this.expression.percent();
        break;
    }
  }

  private clearActive() {
    const buttons = this.formElement.nativeElement.querySelectorAll('.operator.active');
    buttons.forEach(button => button.classList.remove('active'));
  }

}
