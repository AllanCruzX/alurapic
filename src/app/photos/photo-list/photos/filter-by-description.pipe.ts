import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from '../../photo/photo';

@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {
 //Podemos aplicar Pipes em expressões, e existem vários feitos para Angular. No entanto criaremos o nosso, pois queremos aplicar um Pipe denominado filterByDescription em photos, o qual precisará levar o filter em consideração, e por isto o incluiremos após o Pipe.
//Quando implementarmos a interface PipeTransform somos obrigados a implementar o método transform(), passando todos os seus parâmetros necessários, caso contrário nosso arquivo .ts jamais compilará. 

    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase();

        if(descriptionQuery) {
            return photos.filter(photo => 
                photo.description.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return photos;
        }
    }

}