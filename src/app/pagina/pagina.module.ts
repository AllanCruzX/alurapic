import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginaComponent } from './pagina.component';




@NgModule({
    declarations: [PaginaComponent],
    imports: [ 
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
       
     ]
})
export class PaginaModule { 
  
}