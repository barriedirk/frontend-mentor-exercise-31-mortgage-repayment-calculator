import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { OnlyNumbersDirective } from '@directives/only-numbers';

const MORTGAGE_TYPE = {
  repayment: 'repayment',
  interestOnly: 'interestOnly',
};

@Component({
  selector: 'app-mortgage-calculator',
  standalone: true,
  imports: [ReactiveFormsModule, OnlyNumbersDirective],
  templateUrl: './mortgage-calculator.html',
  styleUrl: './mortgage-calculator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MortgageCalculator {
  mortgageForm: FormGroup;
  showResults = false;
  monthlyRepayment = 0;
  totalRepayment = 0;

  constructor() {
    this.mortgageForm = new FormGroup({
      mortgageAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      mortgageTerm: new FormControl('', [Validators.required, Validators.min(1)]),
      interestRate: new FormControl('', [Validators.required, Validators.min(1)]),
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
  }

  calculateRepayments() {
    if (this.mortgageForm.invalid) return;

    const { mortgageAmount, mortgageTerm, interestRate, mortgageType } = this.mortgageForm.value;

    this.monthlyRepayment = mortgageAmount * 0.05;
    this.totalRepayment = this.monthlyRepayment * mortgageTerm * 12;

    this.showResults = true;
  }
}
