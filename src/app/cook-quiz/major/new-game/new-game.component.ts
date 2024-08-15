import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiCheckboxLabeledModule, TuiRadioLabeledModule } from "@taiga-ui/kit";
import { QuestionsLite } from "../../../core/questions/questions.data";
import { Questions } from "../../../interfaces/questions";

@Component({
  selector: "app-new-game",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TuiRadioLabeledModule,
    TuiCheckboxLabeledModule,
  ],
  templateUrl: "./new-game.component.html",
  styleUrl: "./new-game.component.scss",
})
export class NewGameComponent {
  public form: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder) {
    this.generateForm();
  }

  public generateForm(): void {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
    QuestionsLite.forEach(item => {
      if (item.type === "check") {
        (this.form?.get("questions") as FormArray).push(
          new FormArray(item.answers.map(() => new FormControl(false)))
        );
      } else {
        (this.form?.get("questions") as FormArray).push(
          new FormControl("", Validators.required)
        );
      }
    });
  }

  public getFormControl(index: number): FormControl {
    return (this.form.controls["questions"] as FormArray).controls[
      index
    ] as FormControl;
  }

  public getFormArray(index: number, index2: number): FormControl {
    return (
      (this.form.controls["questions"] as FormArray).controls[
        index
      ] as FormArray
    ).controls[index2] as FormControl;
  }

  public get questions(): Questions[] {
    return QuestionsLite;
  }
}
