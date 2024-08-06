import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
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
import { BackendService } from "../../../services/backend.service";
import { Router } from "@angular/router";
import { RegNewUser } from "../../../interfaces/reg-new-user";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { customValidator } from "../../../core/validators/custom.validator";
import { TuiValidationError } from "@taiga-ui/cdk";
import { outPutErrors } from "../../shared/utils/error-output";
import { ObjectErrorsValidator } from "../../../interfaces/object-errors-validator";

@Component({
  selector: "app-registration",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule,
    TuiInputModule,
    TuiButtonModule,
    TuiErrorModule,
  ],
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  public form?: FormGroup;

  private readonly destroy = inject(DestroyRef);

  constructor(
    private readonly service: BackendService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {
    this.form = this.fb.group(
      {
        login: this.fb.control("", [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
          Validators.pattern("[a-zA-Z0-9]*"),
        ]),
        password: this.fb.control("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern(String.raw`(?=\w*?[a-z])(?=\w*?[0-9])\w*`),
        ]),
        confirmPassword: this.fb.control("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
        ]),
        email: this.fb.control("", [Validators.required, Validators.email]),
      },
      { validators: customValidator() }
    );
  }

  public regNewUser(): void {
    if (this.form?.valid) {
        const body: RegNewUser = {
          username: this.form.get("login")?.value,
          password: this.form.get("password")?.value,
          email: this.form.get("email")?.value,
        };
        this.service
          .auth
          .regNewUser$(body)
          .pipe(takeUntilDestroyed(this.destroy))
          .subscribe();
        this.router.navigateByUrl("/major");
    } else {
      this.form?.markAllAsTouched();
    }
  }

  public get passwordConfirmError(): TuiValidationError | null {
    return outPutErrors(this.form)
  }

  public get passwordError(): TuiValidationError | null {
    return outPutErrors(this.form?.controls["password"])
  }

  public get loginError(): TuiValidationError | null {
    return outPutErrors(this.form?.controls["login"])

  }

  public get emailError(): TuiValidationError | null {
    return outPutErrors(this.form?.controls["email"])
  }

  public goToLogin(): void {
    this.router.navigateByUrl("/major");
  }
}
