import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputSliderModule, TuiRadioBlockModule } from "@taiga-ui/kit";
import { BackendService } from "../../../shared/backend.service";
import { QuizSettingsService } from "../../shared/utils/quiz-settings.service";

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

  constructor(
    private readonly service: BackendService,
    private readonly fb: FormBuilder,
    private readonly route: Router,
    private readonly quizService: QuizSettingsService
  ) {
    this.form = this.fb.group({
      complexity: this.fb.control(this.quizService.getSettings().complexity, Validators.required),
      music: this.fb.control(this.quizService.getSettings().music, Validators.required),
      sound: this.fb.control(this.quizService.getSettings().sound, Validators.required),
      volume: this.fb.control(this.quizService.getSettings().volume * 100, Validators.required),
    });
  }

  public saveSetting(): void {
    const body = {
      complexity: this.form.controls["complexity"].value,
      music: this.form.controls["music"].value,
      sound: this.form.controls["sound"].value,
      volume: this.form.controls["volume"].value / 100,
    };
    this.service.quiz.setSettings(body);
    this.route.navigateByUrl("/major/menu");
  }
}
