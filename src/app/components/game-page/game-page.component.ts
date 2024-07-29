import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiButtonModule } from '@taiga-ui/core';
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
  public sizeTiles: string = "";
  
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
  
  constructor(private readonly cdr: ChangeDetectorRef,
    private readonly router: Router){
      this.countInput.valueChanges
      .pipe(takeUntilDestroyed(this.destroy), debounceTime(1000))
      .subscribe(data => {
          this.generateMatrix(Number(data));
          console.log(this.matrixOfGame);
          this.sizeTiles = 100 * Number(data) + "px";
          this.cdr.detectChanges();
      });
    }

  public generateMatrix(n: number): void {
    this.matrixOfGame = [];
    for(let i = 0; i < n; i++)
    {
      for(let j = 0; j < n; j++)
      {
        const data = {
          x: i,
          y: j,
          color: this.colors[Math.floor(Math.random() * (7 - 0) + 0)]
        }
        this.matrixOfGame?.push(data);
      }
    }
  }

  public goToImages(): void {
    this.router.navigateByUrl("");
  }
}
