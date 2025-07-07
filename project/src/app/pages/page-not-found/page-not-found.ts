import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFound {}
