import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  //AppComponent é o primeiro componente carregado da nossa aplicação. e ele que tem o routOutLet
   //Essa classe só é um componente por que está anotada com o  @Component
   //selector permiti usar o componente en templates ("no html chama ex:  <app-root></app-root>")
   //templateUrl diz qual vai ser a paresentação do component (" É a view do componente")
   // styleUrls é o css da pagina.
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) {
      //private router: Router - Vai dar acesso ao evento.
      //private activatedRoute: ActivatedRoute -  Vai dar informação da rota que está sendo disparada na quele momento.

    }

    ngOnInit(): void {
      //O metodo vai mudar o title da rota.
      //Uma instância de Router possui a propriedade events, um Observable que nos permite saber a fase atual da rota acessada pela aplicação.
      //Um evento do tipo NavigationEnd é aquele disparado quando a rota termina com sucesso.
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .pipe(map(() => this.activatedRoute))
        .pipe(map(route => {
          //subindo a hieraquia para pegar a rota que está sendo ativada no momento.
          while(route.firstChild) route = route.firstChild;
          return route;
        }))
        .pipe(switchMap(route => route.data))
        .subscribe(event => this.titleService.setTitle(event.title));
      }

 }
