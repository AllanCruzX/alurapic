import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Input } from "@angular/core";
import { PhotoService } from "../../photo/photo.service";
import { PhotoComment } from '../../photo/photo-comments';


@Component({
    selector: 'ap-photo-comments',
    templateUrl: './photo-comments.component.html'
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId: number;

    comments$: Observable<PhotoComment[]>;

    constructor(private photoService: PhotoService) {}

    ngOnInit(): void {

        console.log(this.photoId);
        

        this.comments$ = this.photoService.getComments(this.photoId);
    }
}