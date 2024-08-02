import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TuiButtonModule, TuiErrorModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { BackendService } from "../../services/backend.service";
import { Router } from "@angular/router";
import { RegNewUser } from "../../interfaces/reg-new-user";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { customValidator } from "../../validators/custom.validator";
import { TuiValidationError } from "@taiga-ui/cdk";
import { outPutErrors } from "./error-output";
import { ObjectErrorsValidator } from "../../interfaces/object-errors-validator";

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
  changeDetection: ChangeDetectionStrategy.OnPush
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
          Validators.pattern("[a-zA-Z]*")
        ]),
        password: this.fb.control("", [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          Validators.pattern("(?=.*?[a-z])(?=.*?[0-9]).*"),
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
      if (
        this.form.get("password")?.value ==
        this.form.get("confirmPassword")?.value
      ) {
        const body = {
          username: this.form.get("login")?.value,
          password: this.form.get("password")?.value,
          email: this.form.get("email")?.value,
        };
        this.service
          .regNewUser$(body as RegNewUser)
          .pipe(takeUntilDestroyed(this.destroy))
          .subscribe();
        this.router.navigateByUrl("/major");
      } else {
        console.log("confirmPassword");
      }
    } else {
      console.log("Form invalid");
    }
  }

  public get passwordConfirmError(): TuiValidationError | null {
    return this.form?.errors ? new TuiValidationError(outPutErrors(this.form?.errors as ObjectErrorsValidator)) : null;
  }

  public get passwordError(): TuiValidationError | null {
    return this.form?.controls["password"].errors ? new TuiValidationError(outPutErrors(this.form?.controls["password"].errors as ObjectErrorsValidator)) : null;
  }

  public get passwordSecondError(): TuiValidationError | null {
    return this.form?.controls["confirmPassword"].errors ? new TuiValidationError(outPutErrors(this.form?.controls["confirmPassword"].errors as ObjectErrorsValidator)) : null;
  }

  public get loginError(): TuiValidationError | null {
    return this.form?.controls["login"].errors ? new TuiValidationError(outPutErrors(this.form?.controls["login"].errors as ObjectErrorsValidator)) : null;
  }

  public get emailError(): TuiValidationError | null {
    return this.form?.controls["email"].errors ? new TuiValidationError(outPutErrors(this.form?.controls["email"].errors as ObjectErrorsValidator)) : null;
  }

  public goToLogin(): void {
    // this.router.navigateByUrl("/major"); 
    console.log(this.form?.controls["password"].errors);
       
  }
}
