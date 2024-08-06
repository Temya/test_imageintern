import { Injectable, inject } from '@angular/core';
import { GameSettings } from '../../interfaces/game-settings';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsComponent } from '../../cook-quiz/major/settings/settings.component';

@Injectable({
  providedIn: 'root'
})
export class QuizSettingsService {

  private readonly settings = inject(SettingsComponent).body;

  constructor() {

   }
}
