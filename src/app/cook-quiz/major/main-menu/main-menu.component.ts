import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { CommonModule } from "@angular/common";
import { BackendService } from "../../../shared/backend.service";
import { GameSettings } from "../../shared/interfaces/game-settings";

@Component({
  selector: "app-main-menu",
  standalone: true,
  imports: [TuiButtonModule, RouterOutlet, CommonModule],
  templateUrl: "./main-menu.component.html",
  styleUrl: "./main-menu.component.scss",
})
export class MainMenuComponent {
  private readonly setting?: GameSettings;

  constructor(
    private readonly router: Router,
    private readonly service: BackendService
  ) {
    this.setting = service.quiz.getSettings();
    let audio = new Audio("/files/menu.mp3");    
    audio.load();
    audio.play();
  }

  public goToNewGame(): void {
    this.router.navigateByUrl("/major/game");
  }

  public goToSettings(): void {
    this.router.navigateByUrl("/major/settings");
  }

  public goToViewingAchievements(): void {
    this.router.navigateByUrl("/major/achivements");
  }

  public exit(): void {
    this.service.auth.handleLogoutWithRedirect();
  }
}
