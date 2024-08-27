import { Component } from "@angular/core";
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";
import { Achievements } from "../../../interfaces/questions";
import { CommonModule } from "@angular/common";
import { QuizSettingsService } from "../../shared/utils/quiz-settings.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-achievements",
  standalone: true,
  imports: [TuiButtonModule, TuiSvgModule, CommonModule, RouterLink],
  templateUrl: "./achievements.component.html",
  styleUrl: "./achievements.component.scss",
})
export class AchievementsComponent {
  public achievements: Achievements[] = [];

  constructor(private readonly settingsService: QuizSettingsService) {
    this.achievements = this.settingsService.achives;
  }
}
