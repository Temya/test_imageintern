import { AbstractControl, FormControl } from "@angular/forms";
import { TuiValidationError } from "@taiga-ui/cdk";

export function outPutErrors(
  control?: AbstractControl
): TuiValidationError | null {
  if (control?.hasError("required"))
    return new TuiValidationError("Required field");
  if (control?.hasError("email"))
    return new TuiValidationError("Not correct email");
  if (control?.hasError("pattern"))
    return new TuiValidationError("Incorrect text format");
  if (control?.hasError("maxlength"))
    return new TuiValidationError(
      `You entered more than ${getMaxLengthFromValidator(control)} characters`
    );
  if (control?.hasError("minlength"))
    return new TuiValidationError(
      `You entered less than ${getMinLengthFromValidator(control)} characters`
    );
  if (control?.hasError("coincidence"))
    return new TuiValidationError("Passwords don't match");
  return null;
}

export function getMaxLengthFromValidator(
  control: AbstractControl,
  fallback: number
): number;
export function getMaxLengthFromValidator(
  control: AbstractControl
): number | undefined;
export function getMaxLengthFromValidator(
  control: AbstractControl,
  fallback?: number
): number | undefined {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return fallback;
  }

  const errors = validatorFn(new FormControl({ length: Infinity }));
  return errors?.["maxlength"]?.["requiredLength"] ?? fallback;
}

export function getMinLengthFromValidator(
  control: AbstractControl,
  fallback: number
): number;
export function getMinLengthFromValidator(
  control: AbstractControl
): number | undefined;
export function getMinLengthFromValidator(
  control: AbstractControl,
  fallback?: number
): number | undefined {
  const validatorFn = control.validator;

  if (validatorFn === null) {
    return fallback;
  }

  const errors = validatorFn(new FormControl({ length: 0 }));
  return errors?.["minlength"]?.["requiredLength"] ?? fallback;
}
