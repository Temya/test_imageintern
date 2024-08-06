import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiRadioBlockModule } from "@taiga-ui/kit";

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

  public form?: FormGroup;

  constructor(private readonly fb: FormBuilder){
    this.form = this.fb.group({
      complexity: this.fb.control("", [Validators.required]),
      musik: this.fb.control("", [Validators.required]),
      sound: this.fb.control("", Validators.required)
    });
  }


}
