import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ap-load-button',
  templateUrl: './load-button.component.html',
  styleUrls: ['./load-button.component.css']
})
export class LoadButtonComponent implements OnInit {

  //Pai emite para o filho (input);
  //botão para carregar as imagens sobre demanda
  @Input() hasMore: boolean = false;

  
  constructor() { }

  ngOnInit() {
  }

}
