import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Photo } from "./photo";

const API = 'http://localhost:3000';
//será no escopo raiz, isto é, qualquer componente da nossa aplicação que precisar de PhotoService o terá disponível.

@Injectable({ providedIn: 'root' })//Injectable para a classe que quiser consumir a classe  PhotoService poder injetar ela no contrutor.  providedIn: 'root' escopo  (Onde vai ser vista a classe o escoppo root - significa que ela vai ser visivel para todo o sistema).
export class PhotoService {

    constructor(private http: HttpClient) {} // Acesso à comunicação com a Web API ,toda comunicação com o back end será feita: o HttpClient.(Faz requisições ajax para o bak-end).

    listFromUser(userName: string) {
        return this.http
            .get<Photo[]>(API + '/' + userName + '/photos');       
    }
}
