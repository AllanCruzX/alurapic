import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SignInComponent } from './home/signin/signin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { SignUpComponent } from './home/signup/signup.component';

const routes: Routes = [
    { 
        path: '',
        component: SignInComponent,
        canActivate: [AuthGuard]
    },    

    { 
        path: 'signup',
        component: SignUpComponent,
       
    },  

    { 
        path: 'user/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent 
    },
    { 
        path: '**', 
        component: NotFoundComponent 
    }  
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes) 
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
    //Modulo responsavel por definir a rotas do sistema o angular usa esse modulo para saber qual pagina ira exibir atrves das urls (Antes de acessar o back-end o angular verifica a url exibi a pagina depois acessa o back-end).
//<router-outlet></router-outlet> no app.component.htm e preciso usar a tag para as rotas serem acessadas.
 }

