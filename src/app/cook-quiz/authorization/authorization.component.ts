import { CommonModule } from "@angular/common";
import { Component, DestroyRef, inject } from "@angular/core";
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
})
export class AuthorizationComponent {
  public formLogin?: FormGroup;

  private readonly destroy = inject(DestroyRef);

  constructor(
    private readonly fb: FormBuilder,
    private readonly service: BackendService,
    private readonly router: Router
  ) {
    this.formLogin = this.fb.group({
      login: this.fb.control("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64),
        Validators.pattern("[a-zA-Z]*"),
      ]),
      password: this.fb.control("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern("^(?=.*?[a-z]).*$"),
      ]),
    });
  }

  public auth(): void {
    if(this.formLogin?.valid){
      this.service
      .checkAuth$(
        this.formLogin?.get("login")?.value as string,
        this.formLogin?.get("password")?.value as string
      )
      .pipe(takeUntilDestroyed(this.destroy))
      .subscribe(data => {
        if (data) {
          this.router.navigateByUrl("/major/...");
        } else {
          console.log("Invalid login or password");
        }
      });
    }
  }

  public goRegistration(): void {
    this.router.navigateByUrl("/major/register");
  }
}
