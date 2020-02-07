import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap, tap } from 'rxjs/operators';

import { Input } from "@angular/core";
import { PhotoService } from "../../photo/photo.service";
import { PhotoComment } from '../../photo/photo-comments';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['photo-comments.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;
    commentForm: FormGroup;

       comments$: Observable<PhotoComment[]>;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
        ) {}

    ngOnInit(): void {

        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });

    }

    save() {
        
        // O RxJS possui o operador switchMap, e é justamente ele que importaremos em photo-comments.component.ts de rxjs/operators. Feito isso, faremos um pipe(), que receberá esse novo operador, que por sua vez executará a operação de outro observable. Isso também irá gerar um efeito colateral em nosso código: devemos limpar o formulário e exibir a mensagem de alerta.
        //tap antes de retornar o comments ele executa o tap

        //O operador switchMap cancela o Observable anterior passando o fluxo para um novo Observable, garantindo assim que a emissão tenha apenas o valor emitido pelo Observable retornado por switchMap.
        const comment = this.commentForm.get('comment').value as string;
        this.comments$ = this.photoService
                .addComment(this.photoId, comment)
                .pipe(switchMap(() => this.photoService.getComments(this.photoId)))
                .pipe(tap(() => {
                    this.commentForm.reset();
                   
          }));
    }
}