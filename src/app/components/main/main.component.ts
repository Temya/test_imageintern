import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from "@angular/core";
import { TuiInputModule, TuiPaginationModule, TUI_ARROW } from "@taiga-ui/kit";
import { TuiButtonModule, TuiDialogModule, TuiLoaderModule, TuiSvgModule } from "@taiga-ui/core";
import { BackendService } from "../../services/backend.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { Images } from "../../interfaces/images";
import { CommonModule } from "@angular/common";
import { TuiDataListModule } from "@taiga-ui/core";
import { TuiHostedDropdownModule } from "@taiga-ui/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { delay, debounceTime } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [
    TuiDialogModule,
    TuiInputModule,
    TuiButtonModule,
    ReactiveFormsModule,
    CommonModule,
    TuiDataListModule,
    TuiSvgModule,
    TuiHostedDropdownModule,
    TuiPaginationModule,
    TuiLoaderModule
  ],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  public images: Images[] = [];
  public searchInput = new FormControl("");
  public pageIndex = 0;
  public loadingStatus = false;
  public pageCount = 0;
  public searchWord = "";
  public categoryWord = "all";
  public sortWord = "popular";

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
    private readonly cdr: ChangeDetectorRef,
    private readonly router: Router
  ) {
    this.getItems();
    this.searchInput.valueChanges
      .pipe(takeUntilDestroyed(this.destroy), debounceTime(1000))
      .subscribe(data => {
          this.searchWord = data as string;
          this.pageIndex = 0;
          this.getItems();
      });
  }

  public setCategory(value: string): void {
    this.pageIndex = 0;
    this.categoryWord = value;
    this.getItems();
  }

  public setSort(): void {
    this.pageIndex = 0;
    if (this.sortWord === "latest") {
      this.sortWord = "popular";
    }
    else{
      this.sortWord = "latest";
    }
    this.getItems();
  }

  public goToPage(index: number): void {
    this.pageIndex = index;
    this.getItems();
  }

  public getItems(): void {
    this.loadingStatus = true;
    this.cdr.markForCheck();
    const params = {
      q: this.searchWord,
      category: this.categoryWord,
      order: this.sortWord,
      page: this.pageIndex + 1,
      per_page: 8,
    }
    this.service
      .getAllDataImages$(params)
      .pipe(takeUntilDestroyed(this.destroy), delay(100))
      .subscribe(data => {
        this.loadingStatus = false;
        this.images = data.hits;
        console.log(data);
        this.pageCount = Math.ceil(data.totalHits/8);
        this.cdr.detectChanges();
      });
  }

  public goToGame(): void {
    this.router.navigateByUrl("game");
  }
}
