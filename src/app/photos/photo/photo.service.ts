import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";
import { PhotoComment } from './photo-comments';
import { map, catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

//const API = 'http://localhost:3000';
const API = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class PhotoService {
    //camada que se comunica com a API

    constructor(private http: HttpClient) {}

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');       
    }

    listFromUserPaginated(userName: string, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos', { params });       
    }
    
  
 upload(description: string, allowComments: boolean, file: File) {

    //

    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(API + '/photos/upload', formData);
    } 

    findById(photoId: number) {

        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    getComments(photoId: number) {
        return this.http.get<PhotoComment[]>(
            API + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string) {

        return this.http.post(
            API + '/photos/' + photoId + '/comments',
            {
                 commentText
            }
        );
    }

    removePhoto(photoId: number) {
        return this.http.delete(API + '/photos/' + photoId);
    }

    indById(id: string) {

        return this.http.get<Photo>(API + '/photos/' + id);
    }

    like(photoId: number) {

        //observable com valor false. Para tanto, importaremos um operador RxJS of().
        // of - pode criar uma observable de qualquer coisa.
        //throwError - passa o erro adiante.(permitir lanca um erro que vai ser disparado pelo RXJS)
        //Através do operador catchError podemos tratar erros, evitando assim que se propague para quem realizou a inscrição no Observable.

        return this.http.post(
            API + '/photos/' + photoId +  '/like', {}, {observe: 'response'}
        )
        .pipe(map(res => true))
        .pipe(catchError(err => {
            return err.status == '304' ? of(false) : throwError(err);
        }));
    }

}
