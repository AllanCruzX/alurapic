import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import {  LoginGuard } from '../core/auth/login.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';


const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        canActivate: [LoginGuard],
        children: [
            {
                path: '',
                component: SignInComponent,
            },
            {
                path: 'signup',
                component: SignUpComponent,
            },
        ]
    }, 

   
];

@NgModule({
    imports: [ 
        RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
})
export class HomeRoutingModule {
    //Modulo responsavel por definir a rotas do sistema o angular usa esse modulo para saber qual pagina ira exibir atrves das urls (Antes de acessar o back-end o angular verifica a url exibi a pagina depois acessa o back-end).
//<router-outlet></router-outlet> no app.component.htm e preciso usar a tag para as rotas serem acessadas.
 }

