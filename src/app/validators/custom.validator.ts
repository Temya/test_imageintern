import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function customValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstPassword = control.get("password")?.value;
    const secondPassword = control.get("confirmPassword")?.value;
    return firstPassword !== secondPassword
      ? { coincidence: { password: "notConfirm" } }
      : null;
  };
}
