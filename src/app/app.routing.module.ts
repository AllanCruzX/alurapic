import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import {  AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';




const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
       
    }, 

    { 
        path: 'user/:userName', 
        pathMatch: 'full',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        },

        data: { 
            title: 'Timeline'
        }
    
    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard],
        data: { 
            title: 'Photo upload'
        }
    },
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent,
        data: { 
            title: 'Photo detail'
        }
       
    },
    { 
        path: 'not-found',
        component: NotFoundComponent,
        data: { 
            title: 'Not found'
        }
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [ 
        RouterModule.forRoot(routes, { useHash: true } )
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {
    //Modulo responsavel por definir a rotas do sistema o angular usa esse modulo para saber qual pagina ira exibir atrves das urls (Antes de acessar o back-end o angular verifica a url exibi a pagina depois acessa o back-end).
//<router-outlet></router-outlet> no app.component.htm e preciso usar a tag para as rotas serem acessadas.

// path: 'p/:photoId',  - parametrizei a rota

//data-> Na rota da timeline, inseriremos a propriedade data , em seguida definiremos o título como Timeline. O título de cada componente que equivale a uma página será definido no próprio sistema de rotas.
 }

