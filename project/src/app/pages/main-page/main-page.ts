import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MortgageCalculator } from '@app/components/mortgage-calculator/mortgage-calculator';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MortgageCalculator],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPage {}
