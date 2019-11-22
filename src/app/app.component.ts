import { Component } from '@angular/core';

@Component({
   //Essa classe só é um componente por que está anotada com o  @Component
   //selector permiti usar o componente en templates ("no html chama ex:  <app-root></app-root>")
   //templateUrl diz qual vai ser a paresentação do component (" É a view do componente")
   // styleUrls é o css da pagina.
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }
