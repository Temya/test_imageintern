import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  TuiCheckboxLabeledModule,
  TuiInputModule,
  TuiRadioLabeledModule,
  TuiTilesModule,
} from "@taiga-ui/kit";
import { QuestionsLite } from "../../../core/questions/questions.data";
import { Answer, Questions } from "../../../interfaces/questions";
import { TuiButtonModule } from "@taiga-ui/core";

@Component({
  selector: "app-new-game",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    TuiRadioLabeledModule,
    TuiCheckboxLabeledModule,
    TuiTilesModule,
    TuiButtonModule,
    TuiInputModule
  ],
  templateUrl: "./new-game.component.html",
  styleUrl: "./new-game.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameComponent {
  public form: FormGroup = new FormGroup({});
  public order = new Map();
  public round = 2;

  constructor(private readonly fb: FormBuilder, private readonly cdr: ChangeDetectorRef) {
    this.generateForm();
  }

  public generateForm(): void {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
    QuestionsLite[this.round - 1].questions.forEach(item => {
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
    return QuestionsLite[this.round - 1].questions;
  }

  public checkAnswers(): void {
    this.comparisonOfResults();
    // this.round = 2;
    // this.cdr.detectChanges();
  }

  public comparisonOfResults(): void {
    QuestionsLite[this.round - 1].questions.forEach((question, index) => {
      if (question.type === "radio") {
        console.log((this.getFormControl(index).value as Answer).right);
      }
      if (question.type === "input") {
        console.log(this.getFormControl(index).value?.toLowerCase(), question.answers[0].text?.toLowerCase());
        console.log(this.getFormControl(index).value?.toLowerCase() === question.answers[0].text?.toLowerCase());
      }
      if (question.type === "drag") {
        console.log(this.order);
      }
      if (question.type === "check") {
        ((this.form.controls["questions"] as FormArray).controls[
          index
        ] as FormArray).controls.forEach((item, i) => {
          if(item.value){
            console.log(question.answers[i].right); 
          }
        })
      }
    })
  }
}
