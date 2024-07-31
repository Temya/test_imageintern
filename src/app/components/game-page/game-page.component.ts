import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputCountModule, TuiInputModule } from "@taiga-ui/kit";
import { debounceTime } from "rxjs";
import { GameMatrix } from "../../interfaces/game-matrix";

@Component({
  selector: "app-game-page",
  standalone: true,
  imports: [
    TuiInputModule,
    TuiButtonModule,
    ReactiveFormsModule,
    CommonModule,
    TuiInputCountModule,
  ],
  templateUrl: "./game-page.component.html",
  styleUrl: "./game-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent implements OnInit{
  public countInput = new FormControl(2);
  public matrixOfGame: GameMatrix[] = [];
  public matrixObserved: GameMatrix[] = [];
  public sizeTiles = "";
  public steps = 0;
  public minSteps?: number;
  public maxSteps?: number;
  public isGameOn = false;
  public isGameEnd = false;
  public startTime?: Date;
  public resultTime?: Date;
  public minTime?: Date;
  public maxTime?: Date;

  public colors: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "aqua",
    "blue",
    "violet",
  ];

  private readonly destroy = inject(DestroyRef);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {
    
  }
  ngOnInit(): void {
    this.gameInit(this.countInput.value as number);
    this.countInput.valueChanges
      .pipe(takeUntilDestroyed(this.destroy), debounceTime(1000))
      .subscribe(data => {      
        this.gameInit(data as number);
        this.cdr.detectChanges();
      });
  }

  public generateMatrix(n: number): void {
    this.matrixOfGame = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const data = {
          x: i,
          y: j,
          color: this.colors[Math.floor(Math.random() * 7)],
        };
        if (!this.matrixObserved.length) {
          this.matrixObserved.push({ ...data });
        }
        this.matrixOfGame.push(data);
      }
    }
    this.checkBox();
  }

  public changeBoxColor(colorBox: string): void {
    //Adding a step
    if (this.matrixObserved[1]?.color !== colorBox) {
      this.steps++;

      //Color change in matrixObserved
      this.matrixObserved.forEach(data => (data.color = colorBox));
      //Changing the color of the matrixOfGame in the same positions as in matrixObserved
      for (let i = 0; i < this.matrixObserved.length; i++) {
        this.matrixOfGame.forEach(data => {
          if (
            this.matrixObserved[i].x === data.x &&
            this.matrixObserved[i].y === data.y
          )
            data.color = this.matrixObserved[i].color;
        });
      }
      //Adding adjacent monochrome cells to the matrixObserved
      this.checkBox();
      //Checking for the end of the game
      if (this.matrixObserved.length === this.matrixOfGame.length) {
        this.isGameOn = false;
        this.isGameEnd = true;
        this.resultTime = new Date(
          new Date().getTime() - (this.startTime as Date).getTime()
        );
        if (!this.minSteps || this.steps < this.minSteps) {
          this.minSteps = this.steps;
        }
        if (!this.maxSteps || this.steps > this.maxSteps) {
          this.maxSteps = this.steps;
        }
        if (!this.minTime || this.resultTime < this.minTime) {
          this.minTime = this.resultTime;
        }
        if (!this.maxTime || this.resultTime > this.maxTime) {
          this.maxTime = this.resultTime;
        }
      }
    }
  }

  public checkBox(): void {
    for (let i = 0; i < this.matrixObserved.length; i++) {
      this.matrixOfGame.forEach(data => {
        if (this.checkBoxPosition(data, this.matrixObserved[i])) {
          if (data.color === this.matrixObserved[i].color) {
            let count = 0;
            this.matrixObserved.forEach(value => {
              if (value.x === data.x && value.y === data.y) {
                count++;
              }
            });
            if (count !== 1) {
              this.matrixObserved.push({ ...data });
            }
          }
        }
      });
    }
  }

  public gameInit(data: number): void {
    !data || data === 1 ? this.isGameOn = false : this.isGameOn = true;
    this.isGameEnd = false
    this.startTime = new Date();
    this.steps = 0;
    this.matrixObserved = [];
    this.generateMatrix(data);
    this.sizeTiles = 80 * data + "px";
  }

  public checkBoxPosition(matrixOfGame: GameMatrix, matrixObserved: GameMatrix): boolean{
    if((matrixOfGame.x === matrixObserved.x + 1 &&
      matrixOfGame.y === matrixObserved.y) ||
    (matrixOfGame.x === matrixObserved.x - 1 &&
      matrixOfGame.y === matrixObserved.y) ||
    (matrixOfGame.x === matrixObserved.x &&
      matrixOfGame.y === matrixObserved.y + 1) ||
    (matrixOfGame.x === matrixObserved.x &&
      matrixOfGame.y === matrixObserved.y - 1)){
        return true;
    } else {
      return false;
    }
  }

  public goToNavigatePage(): void {
    this.router.navigateByUrl("");
  }
}
