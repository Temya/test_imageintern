import { Component } from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";

@Component({
  selector: "app-main-menu",
  standalone: true,
  imports: [
    TuiButtonModule,
    RouterOutlet
  ],
  templateUrl: "./main-menu.component.html",
  styleUrl: "./main-menu.component.scss",
})
export class MainMenuComponent {
  constructor(
    private readonly router: Router,
  ) {}

  public goToNewGame(): void{
    this.router.navigateByUrl("/major/menu/game");
  }
  
  public goToSettings(): void{
    this.router.navigateByUrl("/major/menu/settings");
  }

  public goToViewingAchievements(): void{
    this.router.navigateByUrl("/major/menu/achivements");
  }
  
  public exit(): void{
    this.router.navigateByUrl("/major/login");
  }
}
