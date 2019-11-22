import { Component, Input } from '@angular/core';

@Component({
    selector: 'ap-photo',
    templateUrl: 'photo.component.html'
})
export class PhotoComponent {
    
    @Input() description='';
    
    @Input() url='';

     //<!--{{ title }} databind associação de dados-->
     //<img [src]="url" [alt]="title"> - O que acabamos de fazer é denominado One way data binding ("data binding unidirecional"), isto porque os dados saem do componente, da fonte de dados, e vão para o template, no entanto não fazem o caminho contrário, e é importante frisarmos isto.
     //@Input() - são Inbound properties, ou seja, aceitam receber um valor por meio de sua forma declarativa.
}