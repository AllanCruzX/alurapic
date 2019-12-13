import { Component, Input } from '@angular/core';

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {

    //Pai emite para o filho (input);
    //Filho emite para o pai (output).
    
    @Input() description='';
    
    @Input() url='';
}