import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';


@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = []; 
  filter: string = '';
  
  //contructor é uma boa pratica deixar ele para injeção de dependecia.
  constructor(
   
    private activatedRoute: ActivatedRoute
  ) { }

  // A fase OnInit ocorre depois da instanciação de AppComponent, e depois do componente receber as inbound properties.
  //[] vem da base de dados para a view
  //() vem da view para a base de dados
  ngOnInit(): void {


   this.photos = this.activatedRoute.snapshot.data['photos'];
   //snapshot fotografia do que está acontecendo no momento
   //data permite pegar a varivel do app.routing.module.ts
   //Esta é a motivação por trás do Resolver — a resolução de dados assíncronos dos quais o componente depende antes de ser ativado, no momento em que ativamos a rota, antes mesmo dela avaliar tal componente.
  
  }
}
