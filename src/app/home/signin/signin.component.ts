import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/plataform-detector/platform-detector.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit { 

    loginForm: FormGroup;
    @ViewChild('userNameInput')userNameInput: ElementRef<HTMLInputElement>;//O ElementRef é o que chamamos de wrapper, uma "embalagem" que o Angular usa nos elementos do DOM a serem trabalhados.
    //#userNameInput fica no template e é uma variavel de template 
    // @ViewChild injetar o valor na variavel

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private router: Router ,
        private platformDetectorService: PlatformDetectorService) { }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({

            userName: ['', Validators.required],
            password: ['', Validators.required]


        });
    }

    login() {
        

        const userName = this.loginForm.get('userName').value;//pega o valor do formulario
        const password = this.loginForm.get('password').value;
    
        this.authService
            .authenticate(userName, password)
            .subscribe(
                () => this.router.navigate(['user', userName]),
                err => {
                    console.log(err);
                    this.loginForm.reset();//limpa formulario
                    this.platformDetectorService.isPlatformBrowser() &&
                this.userNameInput.nativeElement.focus();//Se for no browser ele uas o focus no componente
                    alert('Invalid user name or password');
                }
            );
    }
}