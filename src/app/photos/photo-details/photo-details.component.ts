import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PhotoService } from "../photo/photo.service";
import { Photo } from "../photo/photo";
import { Observable } from "rxjs";
import { PhotoComment } from '../photo/photo-comments';

@Component({
    templateUrl: './photo-details.component.html',
  
})
export class PhotoDetailsComponent implements OnInit { 

    photo$: Observable<Photo>;
    photoId: number;

  

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService
    ) {}

    ngOnInit(): void {
         //Em seguida escreveremos em const photoId, this.route.params.photoId, lembrando que esse photoId é exatamente o nome que demos para o pathem app.routing.module.ts, isto é, path: 'p/:photoId', é importante que os nomes sejam iguais.
        this.photoId = this.route.snapshot.params.photoId;
        this.photo$ = this.photoService.findById(this.photoId)
       
        
       
            
    }
}