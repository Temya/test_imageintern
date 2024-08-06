import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiButtonModule, TuiErrorModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { Router } from "@angular/router";
import { finalize } from "rxjs";
import { TuiValidationError } from "@taiga-ui/cdk";
import { outPutErrors } from "../../shared/utils/error-output";
import { BackendService } from "../../../shared/backend.service";

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent {
  public form?: FormGroup;

  private readonly destroy = inject(DestroyRef);

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: BackendService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      login: this.fb.control("", [Validators.required]),
      password: this.fb.control("", [Validators.required]),
    });
  }

  public auth(): void {
    if (this.form?.valid) {
      this.service
      .auth
      .login$(
        this.form?.get("login")?.value as string,
        this.form?.get("password")?.value as string
      )
      .pipe(finalize(() => this.cdr.detectChanges()))
      .subscribe({
        next: () => {
          this.router.navigateByUrl("/major/menu");
        },
      });
    }
    else {
      this.form?.markAllAsTouched();
    }
  }

  public get passwordError(): TuiValidationError | null {
    return outPutErrors(this.form?.controls["password"])
  }

  public get loginError(): TuiValidationError | null {
    return outPutErrors(this.form?.controls["login"])
  }

  public goRegistration(): void {
    this.router.navigateByUrl("/major/register");
  }
}
