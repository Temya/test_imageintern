import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'app-navigate',
  standalone: true,
  imports: [TuiButtonModule, TuiSvgModule],
  templateUrl: './navigate.component.html',
  styleUrl: './navigate.component.scss'
})
export class NavigateComponent {
  constructor(private readonly router: Router){}

  public goToGame(): void {
    this.router.navigateByUrl("game");
  }

  public goToPictures(): void {
    this.router.navigateByUrl("pictures");
  }
}
