import { TuiDialogModule, TuiRootModule } from "@taiga-ui/core";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavigateComponent } from "./shared/navigate/navigate.component";
import { TuiPushModule } from "@taiga-ui/kit";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    TuiRootModule,
    TuiDialogModule,
    NavigateComponent,
    TuiPushModule,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  providers: [],
})
export class AppComponent {
  title = "image_site";
}
