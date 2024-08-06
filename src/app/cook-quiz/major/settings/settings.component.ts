import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiRadioBlockModule } from "@taiga-ui/kit";
import { GameSettings } from "../../../interfaces/game-settings";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [
    TuiButtonModule,
    ReactiveFormsModule,
    TuiRadioBlockModule,
    CommonModule
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {

  public complexity = new FormControl("easy", [Validators.required]);
  public body: GameSettings = {
    complexity: this.complexity.value as string,
    musik: "on",
    sound: "on",
    volume: 0.5
  }

  constructor(private readonly fb: FormBuilder){

  }


}
