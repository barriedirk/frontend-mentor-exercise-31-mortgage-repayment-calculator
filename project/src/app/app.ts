import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Frontend Mentor | Mortgage repayment calculator';
}
