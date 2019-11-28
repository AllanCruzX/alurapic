import { PhotoService } from './../photo/photo.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { Subject } from 'rxjs';
import{ debounceTime } from 'rxjs/operators'


@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit , OnDestroy {

  photos: Photo[] = []; 
  filter: string = '';
  debounce:Subject<string> = new Subject<string>(); 
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  
  //contructor é uma boa pratica deixar ele para injeção de dependecia.
  constructor(
       private activatedRoute: ActivatedRoute,
       private photoService: PhotoService
  ) { }

  // A fase OnInit ocorre depois da instanciação de AppComponent, e depois do componente receber as inbound properties.
  //[] vem da base de dados para a view
  //() vem da view para a base de dados
  ngOnInit(): void {
    this.userName = this.activatedRoute.snapshot.params.userName;
   this.photos = this.activatedRoute.snapshot.data['photos'];
   //snapshot fotografia do que está acontecendo no momento
   //data permite pegar a varivel do app.routing.module.ts
   //Esta é a motivação por trás do Resolver — a resolução de dados assíncronos dos quais o componente depende antes de ser ativado, no momento em que ativamos a rota, antes mesmo dela avaliar tal componente.
   this.debounce
   .pipe(debounceTime(300))
   .subscribe(filter => this.filter = filter);
   //aguarda 300 milisegundos para fazer a operação
  
  }

  ngOnDestroy(): void {
    //como o Observable   nunca se completa, ele ficará guardando um espaço na memória, e se saímos deste componente e vamos a outra página, a área da memória continuará ocupada, ocasionando em memory leaking .
    //Ele faz parte do ciclo de vida de um componente do Angular, sendo chamado toda vez que um objeto é destruído.
    this.debounce.unsubscribe();
    // unsubscribe(); para evitar memory leaking.
}

load() {
  
  this.photoService
      .listFromUserPaginated(this.userName, ++this.currentPage)
      .subscribe(photos => {
          this.photos = this.photos.concat(photos);
          if(!photos.length) 
          this.hasMore = false;
      });
}

}
