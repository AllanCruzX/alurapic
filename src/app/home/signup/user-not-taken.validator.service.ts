import { Injectable } from '@angular/core';
import { SignUpService } from './signup.service';
import { AbstractControl } from '@angular/forms';
import { debounceTime, switchMap, map, first } from 'rxjs/operators';

@Injectable()
export class UserNotTakenValidatorService {

    // para que o signup.service.ts possa ser injetado. Para isso criamos a classe UserNotTakenValidatorService.
    //validação assincrona
    // map - O resultado disso será "verdadeiro" ou "falso", que precisarão se tornar "nulo" ou objeto JavaScript, havendo a falha da validação. Então, pediremos ajuda a outro operador do rxjs, o map.
    // first - ele pega o primeiro valor da emissão e completa. e preciso usa o frist se não ele numca completa o metodo.
    constructor(private signUpService: SignUpService) {}

    checkUserNameTaken() {

        //switchMap - Utilizamos o switchMap() pois primeiro pegamos a emissão do Observable, após o qual temos que retornar a emissão do Observable de checkUserNameTaken(). 

        return (control: AbstractControl) => {
            return control
                .valueChanges
                .pipe(debounceTime(300))
                .pipe(switchMap(userName =>
                    this.signUpService.checkUserNameTaken(userName)
                ))
                .pipe(map(isTaken => isTaken ? { userNameTaken: true } : null))
                .pipe(first());
    }
    }
}