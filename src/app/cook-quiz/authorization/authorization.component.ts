import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiButtonModule, TuiErrorModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { BackendService } from "../../services/backend.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { TOKEN_KEY } from "../../core/auth/constants"
import { AuthService } from "../../core/auth/auth.service";
import { finalize } from "rxjs";
import { TuiValidationError } from "@taiga-ui/cdk";
import { outPutErrors } from "../registration/error-output";

@Component({
  selector: "app-authorization",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule,
    TuiInputModule,
    TuiButtonModule,
    TuiErrorModule,
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
            this.router.navigateByUrl("/major/menu");
          }
        }
      )
    }
  }

  public get passwordError(): TuiValidationError | null {
    return this.form?.controls["password"].errors ? new TuiValidationError(outPutErrors(this.form?.controls["password"])) : null;
  }

  public get loginError(): TuiValidationError | null {
    return this.form?.controls["login"].errors ? new TuiValidationError(outPutErrors(this.form?.controls["login"])) : null;
  }

  public goRegistration(): void {
    this.router.navigateByUrl("/major/register");
  }
}
