import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButtonModule, } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { debounceTime } from 'rxjs';
import { GameMatrix } from '../../interfaces/game-matrix';

@Component({
  selector: 'app-game-page',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamePageComponent {

  public numberOfTiles?: number;
  public countInput = new FormControl("");
  public matrixOfGame: GameMatrix[] = [];
  public matrixObserved: GameMatrix[] = [];
  public sizeTiles = "";
  public steps = 0;
  public isGameOn = false;
  public isGameEnd = false;

  public colors: string[] = [
    "red",
    "orange",
    "yellow",
    "green",
    "aqua",
    "blue",
    "violet"
  ]

  private readonly destroy = inject(DestroyRef);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router,
    ) {
    this.countInput.valueChanges
      .pipe(takeUntilDestroyed(this.destroy), debounceTime(1000))
      .subscribe(data => {
        if(!data){
          this.isGameOn = false;
        }
        else{ 
          this.isGameEnd = false;
          this.isGameOn = true};
        this.steps = 0;
        this.matrixObserved = [];
        this.generateMatrix(Number(data));
        this.sizeTiles = 100 * Number(data) + "px";
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
          color: this.colors[Math.floor(Math.random() * (7 - 0) + 0)]
        }
        if (!this.matrixObserved.length) {
          this.matrixObserved.push({ ...data });
        }
        this.matrixOfGame.push(data);
      }
    }
    for (let i = 0; i < this.matrixObserved.length; i++) {
      this.matrixOfGame.map((data) => {
        if (data.x === this.matrixObserved[i].x + 1 && data.y === this.matrixObserved[i].y || data.x === this.matrixObserved[i].x - 1 && data.y === this.matrixObserved[i].y || data.x === this.matrixObserved[i].x && data.y === this.matrixObserved[i].y + 1 || data.x === this.matrixObserved[i].x && data.y === this.matrixObserved[i].y - 1) {
          if (data.color === this.matrixObserved[i].color) {
            let count = 0;
            this.matrixObserved.map((value) => {
              if (value.x === data.x && value.y === data.y) { count++; }
            })
            if (count !== 1) {
              this.matrixObserved.push({ ...data });
            }
          }
        }
      })  
    }
  }

  public changeBoxColor(colorBox: string): void {
    this.steps++;
    this.matrixObserved.map((data) => data.color = colorBox);
    for (let i = 0; i < this.matrixObserved.length; i++) {
      this.matrixOfGame.map((data) => {
        if (this.matrixObserved[i].x === data.x && this.matrixObserved[i].y === data.y)
          data.color = this.matrixObserved[i].color
      })
    }
    for (let i = 0; i < this.matrixObserved.length; i++) {
      this.matrixOfGame.map((data) => {
        if (data.x === this.matrixObserved[i].x + 1 && data.y === this.matrixObserved[i].y || data.x === this.matrixObserved[i].x - 1 && data.y === this.matrixObserved[i].y || data.x === this.matrixObserved[i].x && data.y === this.matrixObserved[i].y + 1 || data.x === this.matrixObserved[i].x && data.y === this.matrixObserved[i].y - 1) {
          if (data.color === this.matrixObserved[i].color) {
            let count = 0;
            this.matrixObserved.map((value) => {
              if (value.x === data.x && value.y === data.y) { count++; }
            })
            if (count !== 1) {
              this.matrixObserved.push({ ...data });
            }
          }
        }
      })  
    }
    if(this.matrixObserved.length === this.matrixOfGame.length){
      this.isGameOn = false;
      this.isGameEnd = true;
    }
  }

  public goToImages(): void {
    this.router.navigateByUrl("");
  }

  
}