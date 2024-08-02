export interface ObjectErrorsValidator {
    email: boolean,
    required: boolean,
    minlength: {requiredLength: number, actualLength: number},
    maxlength: {requiredLength: number, actualLength: number},
    pattern: {requiredPattern: string, actualValue: string},
    coincidence: {password: string}
}
