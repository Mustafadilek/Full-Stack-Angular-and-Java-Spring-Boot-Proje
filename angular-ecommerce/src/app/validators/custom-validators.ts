import { FormControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {

    // whitespace validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors{


    // check if string contains whitespace
    if((control.value!=null)&&(control.value.trim().length===0)){
        // invalid return error object

        return {'notOnlyWhitespace':true};
    }
    else{
        return null;
        }
    }

    constructor(){}

}
