import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { TuiButtonModule, TuiSvgModule } from "@taiga-ui/core";

@Component({
  selector: "app-navigate",
  standalone: true,
  imports: [TuiButtonModule, TuiSvgModule, RouterModule],
  templateUrl: "./navigate.component.html",
  styleUrl: "./navigate.component.scss",
})
export class NavigateComponent {
  constructor(private readonly router: Router) {}

  public goToGame(): void {
    this.router.navigateByUrl("game");
  }

  public goToPictures(): void {
    this.router.navigateByUrl("pictures");
  }
}
