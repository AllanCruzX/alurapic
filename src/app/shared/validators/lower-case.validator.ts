import { AbstractControl } from '@angular/forms';

export function lowerCaseValidator(control: AbstractControl) {

    //validador customizado

    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true }
    }
    return null;
}