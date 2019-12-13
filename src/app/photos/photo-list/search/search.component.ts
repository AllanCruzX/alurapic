import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'ap-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
    
    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = '';
    debounce: Subject<string> = new Subject<string>();
    
    ngOnInit(): void {
        this.debounce
        .pipe(debounceTime(300))
        .subscribe(filter => this.onTyping.emit(filter));
         //aguarda 300 milisegundos para fazer a operação
    }    
    ngOnDestroy(): void {
       //como o Observable   nunca se completa, ele ficará guardando um espaço na memória, e se saímos deste componente e vamos a outra página, a área da memória continuará ocupada, ocasionando em memory leaking .
    //Ele faz parte do ciclo de vida de um componente do Angular, sendo chamado toda vez que um objeto é destruído.
    this.debounce.unsubscribe();
    // unsubscribe(); para evitar memory leaking.
    }
 }