import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputSliderModule, TuiRadioBlockModule } from "@taiga-ui/kit";
import { GameSettings } from "../../shared/interfaces/game-settings";

@Component({
  selector: "app-settings",
  standalone: true,
  imports: [
    TuiButtonModule,
    ReactiveFormsModule,
    TuiRadioBlockModule,
    CommonModule,
    TuiInputSliderModule,
  ],
  templateUrl: "./settings.component.html",
  styleUrl: "./settings.component.scss",
})
export class SettingsComponent {

  public form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group(
      {
        complexity: this.fb.control("easy", Validators.required),
        music: this.fb.control("on", Validators.required),
        sound: this.fb.control("on", Validators.required),
        volume: this.fb.control(50, Validators.required)
      }
    )
  }
}
