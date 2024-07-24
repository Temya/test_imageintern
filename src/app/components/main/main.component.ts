import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import { TuiInputModule, TuiPaginationModule, TUI_ARROW } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { BackendService } from '../../services/backend.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Images } from '../../interfaces/images';
import { CommonModule } from '@angular/common';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiHostedDropdownModule } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';

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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnDestroy {
  public images: Images[] = [];
  public searchInput = new FormControl('');
  public activePadding = 1;
  public sidePadding = 2;
  public pageIndex = 0;

  private readonly unSubscribe$$ = new Subject<void>();
  readonly arrow = TUI_ARROW;

  readonly groups = [
    {
      label: 'backgrounds',
    },
    {
      label: 'fashion',
    },
    {
      label: 'nature',
    },
    {
      label: 'science',
    },
    {
      label: 'education',
    },
    {
      label: 'feelings',
    },
    {
      label: 'health',
    },
    {
      label: 'people',
    },
    {
      label: 'religion',
    },
    {
      label: 'places',
    },
    {
      label: 'animals',
    },
    {
      label: 'industry',
    },
    {
      label: 'computer',
    },
    {
      label: 'food',
    },
    {
      label: 'sports',
    },
    {
      label: 'transportation',
    },
    {
      label: 'travel',
    },
    {
      label: 'buildings',
    },
    {
      label: 'business',
    },
    {
      label: 'music',
    },
  ];

  constructor(
    private readonly service: BackendService,
    private readonly cdr: ChangeDetectorRef
  ) {
    service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        (this.images = data.hits), console.log(data);
        this.cdr.detectChanges();
      });
  }

  public search() {
    this.pageIndex = 0;
    if (this.searchInput.value) {
      this.service.searchWord = this.searchInput.value;
    }
    this.searchInput.setValue('');
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        (this.images = data.hits),
          console.log(this.images),
          this.cdr.detectChanges();
      });
  }

  public setCategory(value: string) {
    this.pageIndex = 0;
    this.service.categoryWord = value;
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        (this.images = data.hits),
          console.log(this.images),
          this.cdr.detectChanges();
      });
  }

  public setPopular() {
    this.pageIndex = 0;
    if (this.service.sortWord === 'latest') {
      this.service.sortWord = 'popular';
    }
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        (this.images = data.hits),
          console.log(this.images),
          this.cdr.detectChanges();
      });
  }

  public setLatest() {
    this.pageIndex = 0;
    if (this.service.sortWord === 'popular') {
      this.service.sortWord = 'latest';
    }
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        (this.images = data.hits),
          console.log(this.images),
          this.cdr.detectChanges();
      });
  }

  public goToPage(index: number): void {
    this.pageIndex = index;
    this.service
      .getAllDataImages$(this.pageIndex + 1)
      .pipe(takeUntil(this.unSubscribe$$))
      .subscribe(data => {
        (this.images = data.hits), console.log(this.images);
        this.cdr.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.unSubscribe$$.next();
    this.unSubscribe$$.complete();
  }
}
