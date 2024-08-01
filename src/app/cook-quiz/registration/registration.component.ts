import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { TuiButtonModule } from "@taiga-ui/core";
import { TuiInputModule, TuiInputPasswordModule } from "@taiga-ui/kit";
import { BackendService } from "../../services/backend.service";
import { Router } from "@angular/router";
import { RegNewUser } from "../../interfaces/reg-new-user";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-registration",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TuiInputPasswordModule,
    CommonModule,
    TuiInputModule,
    TuiButtonModule
  ],
  templateUrl: "./registration.component.html",
  styleUrl: "./registration.component.scss",
})
export class RegistrationComponent {

  public formRegistration?: FormGroup;

  private readonly destroy = inject(DestroyRef);

  constructor(private readonly service: BackendService,
    private readonly fb: FormBuilder,
    private readonly router: Router){
      this.formRegistration = this.fb.group({
        login: this.fb.control("", Validators.required),
        password: this.fb.control("", [Validators.required, Validators.minLength(8), Validators.maxLength(64), Validators.pattern("(?=.*?[a-z])(?=.*?[0-9]).*")]),
        confirmPassword: this.fb.control("", [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),
        email: this.fb.control("", [Validators.required, Validators.email])
      });
    }

    public regNewUser(): void {
      if (this.formRegistration?.valid) {
        if (
          this.formRegistration.get('password')?.value ==
          this.formRegistration.get('confirmPassword')?.value
        ) {
          const body = {
            username: this.formRegistration.get('login')?.value,
            password: this.formRegistration.get('password')?.value,
            email: this.formRegistration.get('email')?.value,
          };
          this.service
            .regNewUser$(body as RegNewUser)
            .pipe(takeUntilDestroyed(this.destroy))
            .subscribe();
          this.router.navigateByUrl('/major');
        } else {
          console.log('confirmPassword');
        }
      } else {
        console.log('Form invalid');
      }
    }

  public goToLogin(): void{
    this.router.navigateByUrl('/major');
  }
}
