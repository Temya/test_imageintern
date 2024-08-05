import { AbstractControl, FormControl, FormGroup } from "@angular/forms";

export function outPutErrors(control: AbstractControl): string {
    if(control.hasError('required'))return "Required field"
    if(control.hasError('email'))return "Not correct email"
    if(control.hasError('pattern'))return "Incorrect text format"
    if(control.hasError('maxlength'))return `You entered more than ${getMaxLengthFromValidator(control)} characters`
    if(control.hasError('minlength'))return `You entered less than ${getMinLengthFromValidator(control)} characters`
    if(control.hasError('coincidence'))return "Passwords don't match"
    return "Invalid"
}

export function getMaxLengthFromValidator(control: AbstractControl, fallback: number): number;
export function getMaxLengthFromValidator(control: AbstractControl): number | undefined;
export function getMaxLengthFromValidator(control: AbstractControl, fallback?: number): number | undefined {
	const validatorFn = control.validator;

	if (validatorFn === null) {
		return fallback;
	}

	const errors = validatorFn(new FormControl({ length: Infinity }));
	return errors?.["maxlength"]?.["requiredLength"] ?? fallback;
}

export function getMinLengthFromValidator(control: AbstractControl, fallback: number): number;
export function getMinLengthFromValidator(control: AbstractControl): number | undefined;
export function getMinLengthFromValidator(control: AbstractControl, fallback?: number): number | undefined {
	const validatorFn = control.validator;

	if (validatorFn === null) {
		return fallback;
	}

	const errors = validatorFn(new FormControl({ length: 0 }));
	return errors?.["minlength"]?.["requiredLength"] ?? fallback;
}
