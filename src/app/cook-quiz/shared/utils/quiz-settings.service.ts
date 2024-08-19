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
      music: "on",
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

  public getMenuMusic(): void {    
    if(this.settings.music === "on") {
      let audio = new Audio("/files/menu.mp3");  
      audio.load();
      audio.volume = this.settings.volume;
      audio.play();
    }
  }

  public getButtonMusik(): void {
    if(this.settings.sound === "on") {
      let audio = new Audio("/files/menu.mp3");    
      audio.load();
      audio.volume = this.settings.volume;
      audio.play();
    }
  }

  public getGameMusic(): void {
    if(this.settings.music === "on") {
      let audio = new Audio("/files/game.mp3");    
      audio.load();
      audio.volume = this.settings.volume;
      audio.play();
    }
  }
}
