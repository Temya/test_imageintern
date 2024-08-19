import { Component } from "@angular/core";
import { TuiButtonModule } from "@taiga-ui/core";

@Component({
  selector: "app-achievements",
  standalone: true,
  imports: [TuiButtonModule,],
  templateUrl: "./achievements.component.html",
  styleUrl: "./achievements.component.scss",
})
export class AchievementsComponent {}
