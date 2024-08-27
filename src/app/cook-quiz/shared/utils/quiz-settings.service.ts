import { Inject, Injectable } from "@angular/core";
import { GameSettings } from "../interfaces/game-settings";
import { Achievements } from "../../../interfaces/questions";
import { AchievementsData } from "../../../core/questions/questions.data";
import { TuiPushService } from "@taiga-ui/kit";
import { TuiAlertService } from "@taiga-ui/core";

@Injectable({
  providedIn: "root",
})
export class QuizSettingsService {
  public settings: GameSettings;
  public achives: Achievements[];
  public questions = 0;

  constructor(
    @Inject(TuiPushService) protected readonly push: TuiPushService,
    @Inject(TuiAlertService) protected readonly alert: TuiAlertService
  ) {
    this.settings = {
      complexity: "easy",
      music: "on",
      sound: "on",
      volume: 0.5,
    };

    this.achives = AchievementsData;
  }

  public setSettings(body: GameSettings): void {
    this.settings = body;
  }

  public getSettings(): GameSettings {
    return this.settings;
  }

  public getMenuMusic(): void {
    if (this.settings.music === "on") {
      let audio = new Audio("/files/menu.mp3");
      audio.load();
      audio.volume = this.settings.volume;
      audio.play();
    }
  }

  public getButtonMusik(): void {
    if (this.settings.sound === "on") {
      let audio = new Audio("/files/menu.mp3");
      audio.load();
      audio.volume = this.settings.volume;
      audio.play();
    }
  }

  public getGameMusic(): void {
    if (this.settings.music === "on") {
      let audio = new Audio("/files/game.mp3");
      audio.load();
      audio.volume = this.settings.volume;
      audio.play();
    }
  }

  public setFirstStep(): void {
    if (!this.achives[0].availability) {
      this.achives[0].availability = true;
      const sub = this.push
        .open("Завершите свой первый квиз.", {
          heading: "Первый Шаг к Мастеру",
          type: "Achievement",
          icon: "tuiIconCheckLarge",
        })
        .subscribe();

      setTimeout(() => {
        sub.unsubscribe();
      }, 3000);
    }
  }

  public setGourmetExpert(result: number): void {
    if (result === 9) {
      if (!this.achives[1].availability) {
        this.achives[1].availability = true;
        const sub = this.push
          .open("Завершите квиз с максимальным результатом.", {
            heading: "Гурман Эксперт",
            type: "Achievement",
            icon: "tuiIconCheckLarge",
          })
          .subscribe();

        setTimeout(() => {
          sub.unsubscribe();
        }, 3000);
      }
    }
  }

  public setTasterWithExperience(): void {
    if (this.questions === 50) {
      if (!this.achives[2].availability) {
        this.achives[2].availability = true;
        const sub = this.push
          .open("Ответьте правильно на 50 вопросов в общей сложности.", {
            heading: "Дегустатор со Стажем",
            type: "Achievement",
            icon: "tuiIconCheckLarge",
          })
          .subscribe();

        setTimeout(() => {
          sub.unsubscribe();
        }, 3000);
      }
    }
  }

  public setSchoolboyCulinary(result: number): void {
    if (this.settings.complexity === "easy" && result === 100) {
      if (!this.achives[3].availability) {
        this.achives[3].availability = true;
        const sub = this.push
          .open("Ответьте правильно на все вопросы в квизе для начинающих.", {
            heading: "Школьник-Кулинар",
            type: "Achievement",
            icon: "tuiIconCheckLarge",
          })
          .subscribe();

        setTimeout(() => {
          sub.unsubscribe();
        }, 3000);
      }
    }
  }

  public setExpressChef(time: number): void {
    if (new Date(time).getUTCSeconds() < 10) {
      if (!this.achives[4].availability) {
        this.achives[4].availability = true;
        const sub = this.push
          .open("Экспресс-Шеф", {
            heading: "Завершите квиз менее чем за 10 секунд.",
            type: "Achievement",
            icon: "tuiIconCheckLarge",
          })
          .subscribe();

        setTimeout(() => {
          sub.unsubscribe();
        }, 3000);
      }
    }
  }
}
