import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { PhotoListResolver } from './photo-list/photo-list.resolver';
import { NotFoundComponent } from './../errors/not-found/not-found.component';


const routes: Routes = [
    { 
        path: 'user/:userName',
        component: PhotoListComponent,
        resolve:{
            photos: PhotoListResolver
        }
 },
    { 
        path: 'p/add', 
        component: PhotoFormComponent
    },
    {
        path:'**',
        component: NotFoundComponent

    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)]

})
export class AppRoutingModule { 

// resolve:{  photos: PhotoListComponent 
}

