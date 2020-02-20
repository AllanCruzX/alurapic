import { ErrorHandler, Injectable, Injector } from "@angular/core";
import * as StackTrace from "stacktrace-js";
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler { 
    //Global error handler e log no server side - customizando o erro global  e  usando  a biblioteca Stacktrace.JS
    //O método StackTrace.fromError transforma a stacktrace de um Error em um array no qual cada item do array é uma stackframe. Sendo um array, podemos aplicar os métodos de transformação presentes em um Array para chegarmos na exibição que desejamos.
    //Permite que o desenvolvedor padronize facilmente a exibição da stack do jeito que achar melhor.



    constructor(private injector: Injector ) {
        //Através de Injector.get(NomeDaDependencia) temos acesso a uma instância criada pelo injector do Angular. Caso a instâncias tenha dependências, elas serão resolvidas pelo contêiner de injeção do Angular

    }

    handleError(error: any): void {
        console.log('passei pelo handler');

      
        const location = this.injector.get(LocationStrategy);
         const userService = this.injector.get(UserService);
         const serverLogService = this.injector.get(ServerLogService);
         const router = this.injector.get(Router);
         
        const url = location instanceof PathLocationStrategy  ? location.path() : '';

        const message = error.message
            ? error.message :
            error.toString();

            if(environment.production){ 
            router.navigate(['/error']);
            }

            StackTrace
            .fromError(error)
            .then(stackFrames => {
                const stackAsString = stackFrames
                    .map(sf => sf.toString())
                    .join('\n')

                    console.log(message);
                    console.log(stackAsString);
                    console.log('o que será enviado para o servidor')
                    serverLogService.log({ 
                        message, 
                        url, 
                        userName: userService.getUserName(), 
                        stack: stackAsString}
                    ).subscribe(
                        () => console.log('Error logged on server'),
                        err => {
                            console.log(err);
                            console.log('Fail to send error log to server');
                        }
                    )
                });
    }
}