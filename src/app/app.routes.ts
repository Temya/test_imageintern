import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/main/main.component').then(i => i.MainComponent),
  },
  {
    path: 'game',
    loadComponent: () =>
      import('./components/game-page/game-page.component').then(i => i.GamePageComponent),
  }
];
