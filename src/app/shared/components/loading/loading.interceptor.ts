import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpSentEvent } from "@angular/common/http";
import { HttpHeaderResponse } from "@angular/common/http";
import { HttpProgressEvent } from "@angular/common/http";
import { HttpResponse } from "@angular/common/http";
import { HttpUserEvent } from "@angular/common/http"
import { LoadingService } from './loading.service';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor{
    //Não basta criarmos um interceptador, ele precisa ser registrado na aplicação para que esteja ativo.
    //providedIn - Decorador que marca uma classe como disponível para ser fornecida e injetada como uma dependência.
    //root': o injetor no nível do aplicativo na maioria dos aplicativos.
    //'platform': um injetor de plataforma singleton especial compartilhado por todos os aplicativos na página.
    //any': fornece uma instância única em todos os módulos (incluindo módulos preguiçosos) que injetam o token.

    constructor(private loadingService: LoadingService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): 
    Observable<HttpSentEvent | 
    HttpHeaderResponse | 
    HttpProgressEvent | 
    HttpResponse<any> | 
    HttpUserEvent<any>> {
        // next: HttpHandler lida com a requisição
        //tap(), que nos permite executar um código entre a chegada dos dados e subinscrição. 
        return next
            .handle(req)
            .pipe(tap(event => {
                if(event instanceof HttpResponse) {
                    this.loadingService.stop();
                } else {
                    this.loadingService.start();
                }
            }))
}
}