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
import { QuestionsHard, QuestionsLite, QuestionsMedium } from "../../../core/questions/questions.data";
import { Answer, Questions, Round } from "../../../interfaces/questions";
import { TuiButtonModule } from "@taiga-ui/core";
import { QuizSettingsService } from "../../shared/utils/quiz-settings.service";
import { Router, RouterLink } from "@angular/router";

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
    TuiInputModule,
    RouterLink
  ],
  templateUrl: "./new-game.component.html",
  styleUrl: "./new-game.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewGameComponent {
  public form: FormGroup = new FormGroup({});
  public order = new Map();
  public round = 1;
  public answers: Answer[] = [];
  public complexity: Round[] = [];

  constructor(
    private readonly fb: FormBuilder, 
    private readonly cdr: ChangeDetectorRef, 
    private readonly quizService: QuizSettingsService) {
    this.quizService.getGameMusic();

    if(this.quizService.getSettings().complexity === "easy") {this.complexity = QuestionsLite}
    if(this.quizService.getSettings().complexity === "medium") {this.complexity = QuestionsMedium}
    if(this.quizService.getSettings().complexity === "hard") {this.complexity = QuestionsHard}
    if(this.round === 2) {
      this.answers = this.randomPosition(QuestionsLite[1].questions[0].answers);
    }

    this.generateForm();
  }

  public generateForm(): void {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
      this.complexity[this.round - 1].questions.forEach(item => {
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
    console.log(index, index2, ((this.form.controls["questions"] as FormArray).controls)
    );
    
    return (
      (this.form.controls["questions"] as FormArray).controls[
      index
      ] as FormArray
    )?.controls[index2] as FormControl;
  }

  public get questions(): Questions[] {
    console.log(this.complexity[this.round - 1].questions);
    
    return this.complexity[this.round - 1].questions;
  }

  public checkAnswers(): void {
    this.comparisonOfResults();
    // this.round = 2;
    // this.cdr.detectChanges();
  }

  public comparisonOfResults(): void {
      this.complexity[this.round - 1].questions.forEach((question, index) => {
        if (question.type === "radio") {
          console.log((this.getFormControl(index).value as Answer).right);
        }
        if (question.type === "input") {
          console.log(this.getFormControl(index).value?.toLowerCase(), question.answers[0].text?.toLowerCase());
          console.log(this.getFormControl(index).value?.toLowerCase() === question.answers[0].text?.toLowerCase());
        }
        if (question.type === "drag") {
          this.checkDragAndDrop(this.answers);
        }
        if (question.type === "check") {
          ((this.form.controls["questions"] as FormArray).controls[index] as FormArray).controls.forEach((item, i) => {
            if(item.value){
              console.log(question.answers[i].right);
            }
          })
        }
      })
      if(this.round !== 2) {
        this.round++;
        this.generateForm();
      }
  }

  public checkDragAndDrop(drag: Answer[]): void {
    this.questions[0].images?.forEach((image, id) => {
      drag.forEach((data, index) => {
        if(image.text === data.text) {
          this.order.get(index) === id ? console.log("good") : console.log("bad")
        }
      })
    })
  }

  public randomPosition(array: Answer[]): Answer[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
