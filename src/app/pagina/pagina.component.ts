import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';




@Component({
  selector: 'ap-pagina',
  templateUrl: './pagina.component.html'
 
})
export class PaginaComponent  {

    texto = ""; 
    textos = [];
    title = "teste"

    constructor(private router: RouterModule){}


    add(): void{

        this.textos.push(this.texto);

    }

}