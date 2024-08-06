import { Injectable } from "@angular/core";
import { GameSettings } from "../interfaces/game-settings";

@Injectable({
  providedIn: "root",
})
export class QuizSettingsService {
  public settings: GameSettings;

  constructor() {
    this.settings = {
      complexity: "easy",
      musik: "on",
      sound: "on",
      volume: 0.5,
    };
  }

  public setSettings(body: GameSettings): void {
    this.settings = body;
  }

  public getSettings(): GameSettings {
    return this.settings;
  }
}
