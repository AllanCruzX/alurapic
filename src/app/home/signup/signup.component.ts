import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';
import { userNamePassword } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [ UserNotTakenValidatorService ] // quando alguem quiser injetar o  UserNotTakenValidatorService o  SignUpComponent vai ser responsavel
})
export class SignUpComponent implements OnInit {

    signupForm: FormGroup;
    @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signUpService: SignUpService,
        private router: Router ,
        private platformDetectorService: PlatformDetectorService) {

          

        }

    ngOnInit(): void {
        //validações 
        this.signupForm = this.formBuilder.group({
            email: ['',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: ['',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: ['',
                [
                    //entra aqui validadores síncronos
                    //lowerCaseValidator - customizado
                    Validators.required,
                    lowerCaseValidator,
                   // Validators.pattern(/^[a-z0-9_\-]+$/),
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                //entra aqui validadores assincronos
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        },{
            //validação crossfild (Com dois campos)
            validator: userNamePassword


        });

        this.platformDetectorService.isPlatformBrowser() &&
        this.emailInput.nativeElement.focus();
    }

    signup() {
        //Se o formulario está valido e não tem nada pendente ele executa.
        //Podemos consultar se o formulário já foi submetido ou não através com auxílio de uma variável de template que guarda como valor uma referência para o ngForm Supondo que a variável de template se chame xyz, através de xyz.submitted sabemos se o formulário foi submetido ou não, inclusive podemos utilizar essa condição para exibição das mensagens de validação.
        if(this.signupForm.valid && !this.signupForm.pending) {
            const newUser = this.signupForm.getRawValue() as NewUser;
            this.signUpService
                .signup(newUser)
                .subscribe(
                    () => this.router.navigate(['']),
                    err => console.log(err)
               );
                }
    }

}