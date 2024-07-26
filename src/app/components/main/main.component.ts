import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { TuiInputModule, TuiPaginationModule, TUI_ARROW } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { BackendService } from '../../services/backend.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Images } from '../../interfaces/images';
import { CommonModule } from '@angular/common';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiHostedDropdownModule } from '@taiga-ui/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';
import { Handler } from 'express';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    TuiInputModule,
    TuiButtonModule,
    ReactiveFormsModule,
    CommonModule,
    TuiDataListModule,
    TuiSvgModule,
    TuiHostedDropdownModule,
    TuiPaginationModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public images: Images[] = [];
  public searchInput = new FormControl('');
  public pageIndex = 0;
  public timer?: NodeJS.Timeout;

  private readonly destroy = inject(DestroyRef);
  readonly arrow = TUI_ARROW;

  public readonly groups = [
    'backgrounds',
    'fashion',
    'nature',
    'science',
    'education',
    'feelings',
    'health',
    'people',
    'religion',
    'places',
    'animals',
    'industry',
    'computer',
    'food',
    'sports',
    'transportation',
    'travel',
    'buildings',
    'business',
    'music',
    'all',
  ];

  constructor(
    private readonly service: BackendService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        this.images = data.hits;
        console.log(data);
        this.cdr.detectChanges();
      });
    this.searchInput.valueChanges
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.service.searchWord = data as string;
          this.pageIndex = 0;
          this.service
            .getAllDataImages$(this.pageIndex + 1)
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe(imagesData => {
              this.images = imagesData.hits;
              this.cdr.detectChanges();
            });
        }, 1000);
      });
  }

  public setCategory(value: string): void {
    this.pageIndex = 0;
    this.service.categoryWord = value;
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        this.images = data.hits;
        console.log(this.images);
        this.cdr.detectChanges();
      });
  }

  public setPopular(): void {
    this.pageIndex = 0;
    if (this.service.sortWord === 'latest') {
      this.service.sortWord = 'popular';
    }
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        this.images = data.hits;
        console.log(this.images);
        this.cdr.detectChanges();
      });
  }

  public setLatest(): void {
    this.pageIndex = 0;
    if (this.service.sortWord === 'popular') {
      this.service.sortWord = 'latest';
    }
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        this.images = data.hits;
        console.log(this.images);
        this.cdr.detectChanges();
      });
  }

  public goToPage(index: number): void {
    this.pageIndex = index;
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        this.images = data.hits;
        console.log(this.images);
        this.cdr.detectChanges();
      });
  }
}
