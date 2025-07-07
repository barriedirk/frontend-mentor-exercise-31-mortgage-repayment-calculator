import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective {
  private regex = /^\d*\.?\d{0,2}$/;

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    if (!this.regex.test(value)) {
      value = this.sanitizeValue(value);
      inputElement.value = value;
    }
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent): boolean {
    const input = event.target as HTMLInputElement;
    const currentValue = input.value;
    const key = event.key;

    if (!/[\d.]/.test(key)) {
      event.preventDefault();
      return false;
    }

    if (key === '.' && currentValue.includes('.')) {
      event.preventDefault();
      return false;
    }

    const [, decimalPart] = currentValue.split('.');
    if (
      decimalPart !== undefined &&
      decimalPart.length >= 2 &&
      input.selectionStart! > currentValue.indexOf('.')
    ) {
      event.preventDefault();
      return false;
    }

    return true;
  }

  private sanitizeValue(value: string): string {
    let sanitized = value.replace(/[^0-9.]/g, '');

    const parts = sanitized.split('.');
    sanitized = parts[0];
    if (parts.length > 1) {
      sanitized += '.' + parts[1].slice(0, 2);
    }

    return sanitized;
  }
}
