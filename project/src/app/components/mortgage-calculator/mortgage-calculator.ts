import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';

import { FieldError } from '@components/field-error/field-error';
import { AutoFocusDirective } from '@directives/auto-focus';
import { OnlyNumbersDirective } from '@directives/only-numbers';

import { SelectOnFocusDirective } from '@directives/select-on-focus';

const MORTGAGE_TYPE = {
  repayment: 'repayment',
  interestOnly: 'interestOnly',
};

@Component({
  selector: 'app-mortgage-calculator',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    OnlyNumbersDirective,
    DecimalPipe,
    AutoFocusDirective,
    SelectOnFocusDirective,
    FieldError,
  ],
  templateUrl: './mortgage-calculator.html',
  styleUrl: './mortgage-calculator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MortgageCalculator {
  @ViewChild('mortgageAmountInput') mortgageAmountInputRef!: ElementRef<HTMLInputElement>;

  @ViewChildren('radioItem') radioItems!: QueryList<ElementRef<HTMLElement>>;

  mortgageForm: FormGroup;
  showResults = false;
  monthlyRepayment = 0;
  totalRepayment = 0;

  mortgageOptions = [
    { label: 'Repayment', value: MORTGAGE_TYPE.repayment },
    { label: 'Interest Only', value: MORTGAGE_TYPE.interestOnly },
  ];

  constructor() {
    this.mortgageForm = new FormGroup({
      mortgageAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      mortgageTerm: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.pattern(/^\d+$/),
      ]),
      interestRate: new FormControl('', [Validators.required, Validators.min(0.01)]),
      mortgageType: new FormControl(MORTGAGE_TYPE.repayment, Validators.required),
    });
  }

  get interestRateCtrl() {
    return this.mortgageForm.get('interestRate');
  }

  clearAll() {
    this.mortgageForm.reset({
      mortgageType: 'repayment',
    });
    this.showResults = false;

    setTimeout(() => this.mortgageAmountInputRef?.nativeElement.focus());
  }

  selectMortgageType(value: string) {
    this.mortgageForm.get('mortgageType')?.setValue(value);
  }

  handleRadioKeydown(event: KeyboardEvent, currentOption: { label: string; value: string }) {
    const index = this.mortgageOptions.findIndex((o) => o.value === currentOption.value);
    let newIndex = index;

    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      newIndex = (index + 1) % this.mortgageOptions.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      newIndex = (index - 1 + this.mortgageOptions.length) % this.mortgageOptions.length;
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.selectMortgageType(currentOption.value);
      return;
    }

    if (newIndex !== index) {
      event.preventDefault();
      const newValue = this.mortgageOptions[newIndex].value;
      this.selectMortgageType(newValue);
      // Move focus manually
      // const radios = document.querySelectorAll('[role="radio"]');
      // const target = radios[newIndex] as HTMLElement;
      // target?.focus();

      const radioArray = this.radioItems.toArray();
      const target = radioArray[newIndex]?.nativeElement;
      target?.focus();
    }
  }

  calculateRepayments() {
    /*
     * // Repayment Mortgage
     * Formula: monthlyRepayment = P * (r * (1 + r)^n) / ((1 + r)^n - 1)
     * Where:
     * P = loan amount (mortgageAmount)
     * r = monthly interest rate (annualRate / 12 / 100)
     * n = total number of monthly payments (term in years * 12)
     *
     * // Interest-Only Mortgage
     * monthlyRepayment = (P * r)
     * totalRepayment = (monthlyRepayment * n) + P
     *
     * You can compare results using trusted calculators like:
     *
     * Bankrate Mortgage Calculator : https://www.bankrate.com/calculators/mortgages/mortgage-calculator.aspx
     * MoneySavingExpert (UK) : https://www.moneysavingexpert.com/mortgages/mortgage-rate-calculator/
     * NerdWallet Calculator :  https://www.nerdwallet.com/mortgages/mortgage-calculator
     */

    if (this.mortgageForm.invalid) return;

    const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = this.mortgageForm.value;

    const P = Number(mortgageAmount);
    const years = Number(mortgageTerm);
    const annualRate = Number(interestRate);
    const r = annualRate / 100 / 12;
    const n = years * 12;

    let monthlyRepayment = 0;
    let totalRepayment = 0;

    switch (mortgageType) {
      case MORTGAGE_TYPE.repayment:
        if (r === 0) {
          monthlyRepayment = P / n;
        } else {
          monthlyRepayment = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
        }

        totalRepayment = monthlyRepayment * n;

        break;

      case MORTGAGE_TYPE.interestOnly:
        monthlyRepayment = P * r;
        totalRepayment = monthlyRepayment * n;

        break;
    }

    this.monthlyRepayment = monthlyRepayment;
    this.totalRepayment = totalRepayment;

    this.showResults = true;
  }

  disableEnterSubmit(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const target = keyboardEvent.target as HTMLElement;

    if (target.tagName === 'INPUT') {
      keyboardEvent.preventDefault();
    }
  }
}
