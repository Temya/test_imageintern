import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  Inject,
  inject,
} from "@angular/core";
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
import {
  QuestionsHard,
  QuestionsLite,
  QuestionsMedium,
} from "../../../core/questions/questions.data";
import { Answer, Questions, Round } from "../../../interfaces/questions";
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiDialogModule,
  TuiDialogService,
  TuiDialogSize,
} from "@taiga-ui/core";
import { QuizSettingsService } from "../../shared/utils/quiz-settings.service";
import { PolymorpheusContent } from "@tinkoff/ng-polymorpheus";
import { RouterLink } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

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
    RouterLink,
    TuiDialogModule,
  ],
  templateUrl: "./new-game.component.html",
  styleUrl: "./new-game.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewGameComponent {
  public form: FormGroup = new FormGroup({});
  public order = new Map();
  public round = 1;
  public answers: Answer[] = [];
  public complexity: Round[] = [];
  public result = 0;
  public startTime?: Date;

  private readonly destroy = inject(DestroyRef);

  constructor(
    private readonly fb: FormBuilder,
    private readonly cdr: ChangeDetectorRef,
    private readonly quizService: QuizSettingsService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
    this.quizService.getGameMusic();

    switch (this.quizService.getSettings().complexity) {
      case "easy":
        this.complexity = QuestionsLite;
        break;
      case "medium":
        this.complexity = QuestionsMedium;
        break;
      case "hard":
        this.complexity = QuestionsHard;
        break;
      default:
        this.complexity = QuestionsLite;
    }

    this.generateForm();
    this.startTime = new Date();
  }

  public generateForm(): void {
    this.form = this.fb.group({
      questions: this.fb.array([]),
    });
    this.complexity[this.round - 1].questions.forEach(item => {
      const formArray = this.form.get("questions") as FormArray;
      if (item.type === "check") {
        formArray.push(
          new FormArray(item.answers.map(() => new FormControl(false)))
        );
      } else {
        formArray.push(new FormControl("", Validators.required));
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
    )?.controls[index2] as FormControl;
  }

  public get questions(): Questions[] {
    return this.complexity[this.round - 1].questions;
  }

  public comparisonOfResults(): void {
    this.complexity[this.round - 1].questions.forEach((question, index) => {
      if (question.type === "radio") {
        if ((this.getFormControl(index).value as Answer).right) {
          this.result += 1;
          this.quizService.questions++;
        }
      }
      if (question.type === "input") {
        if (
          this.getFormControl(index).value?.toLowerCase() ===
          question.answers[0].text?.toLowerCase()
        ) {
          this.result += 1;
          this.quizService.questions++;
        }
      }
      if (question.type === "drag") {
        this.checkDragAndDrop(this.answers).forEach(data => {
          if (data === "good") {
            this.result += 1;
            this.quizService.questions++;
          }
        });
      }
      if (question.type === "check") {
        (
          (this.form.controls["questions"] as FormArray).controls[
            index
          ] as FormArray
        ).controls.forEach((item, i) => {
          if (item.value) {
            console.log(question.answers[i].right);
          }
        });
      }
    });
    if (this.round !== 2) {
      this.round++;
      this.answers = this.randomPosition(QuestionsLite[1].questions[0].answers);
      this.generateForm();
    }
  }

  public checkDragAndDrop(drag: Answer[]): string[] {
    let array: string[] = [];
    this.questions[0].images?.forEach((image, id) => {
      drag.forEach((data, index) => {
        if (image.text === data.text) {
          this.order.get(index) === id ? array.push("good") : array.push("bad");
        }
      });
    });
    return array;
  }

  public randomPosition(array: Answer[]): Answer[] {
    return array.sort(() => Math.random() - 0.5);
  }

  public onClick(
    content: PolymorpheusContent<TuiDialogContext>,
    header: PolymorpheusContent,
    size: TuiDialogSize
  ): void {
    this.quizService.setFirstStep();
    this.quizService.setGourmetExpert(this.result);
    this.quizService.setTasterWithExperience();
    this.quizService.setSchoolboyCulinary(this.result);
    this.quizService.setExpressChef(
      new Date().getTime() - (this.startTime as Date).getTime()
    );
    this.comparisonOfResults();
    this.dialogs
      .open(content, {
        label: `Молодец, твой результат: ${this.result} правильных ответов`,
        header,
        size,
        dismissible: false,
        closeable: false,
      })
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe();
  }

  public restartGame(): void {
    this.round = 1;
    this.result = 0;
    this.generateForm();
  }
}
