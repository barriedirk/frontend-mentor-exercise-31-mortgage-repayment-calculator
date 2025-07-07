import { Routes } from '@angular/router';

import { MainPage } from '@app/pages/main-page/main-page';
import { PageNotFound } from '@pages/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', component: MainPage },
  { path: '**', component: PageNotFound },
];
