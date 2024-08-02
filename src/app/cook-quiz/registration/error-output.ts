import { ObjectErrorsValidator } from "../../interfaces/object-errors-validator";


export function outPutErrors(valid: ObjectErrorsValidator): string {
    if(valid.required){
        return "Required field"
    }
    if(valid.coincidence){
        return "Passwords don't match"
    }
    if(valid.email){
        return "Not correct email"
    }
    if(valid.pattern){
        return "The presence of a capital letter, a number"
    }
    if(valid.maxlength){
        return `Your length is ${valid.maxlength.actualLength} the required length is no more than ${valid.maxlength.requiredLength}`
    }
    if(valid.minlength){
        return `Your length is ${valid.minlength.actualLength} the required length is at least ${valid.minlength.requiredLength}`
    }
    return "Invalid"
}