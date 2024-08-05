import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { BackendService } from "../../services/backend.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { TOKEN_KEY } from "../../core/auth/constants"
import { AuthService } from "../../core/auth/auth.service";
import { finalize } from "rxjs";

@Component({
  selector: "app-authorization",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule,
    TuiInputModule,
    TuiButtonModule,
  ],
  templateUrl: "./authorization.component.html",
  styleUrl: "./authorization.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent {
  public form?: FormGroup;

  private readonly destroy = inject(DestroyRef);

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: BackendService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {    
    this.form = this.fb.group({
      login: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
    });
  }

  public auth(): void {
    if(this.form?.valid){
      this.authService.login$(
        this.form?.get("login")?.value as string,
        this.form?.get("password")?.value as string
      )
      .pipe(
        finalize(() =>
        this.cdr.detectChanges()
        )
      )
      .subscribe(
        {
          next: () => {
            this.router.navigateByUrl("/major/...");
          }
        }
      )
    }
  }

  public goRegistration(): void {
    this.router.navigateByUrl("/major/register");
  }
}
