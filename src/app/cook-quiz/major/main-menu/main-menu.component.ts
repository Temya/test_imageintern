import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { AuthService } from "../../../core/auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-main-menu",
  standalone: true,
  imports: [TuiButtonModule, RouterOutlet, CommonModule],
  templateUrl: "./main-menu.component.html",
  styleUrl: "./main-menu.component.scss",
})
export class MainMenuComponent {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}

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
    this.authService.handleLogoutWithRedirect();
  }
}
