import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';


const API = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService) { }

  authenticate(userName: string, password: string) {
     //pipe() para que, entre a execução da operação e o subscribe(), executemos um código arbitrário. Isto é, incluiremos operações a serem aplicadas (filtro, timeout e por aí vai) antes do uso do subscribe(). A operação tap serve para a geração de side effects, normalmente quando queremos logar no console, ou acessar e gravar algum valor. O res é a resposta para quem for usar o subscribe(), em que criaremosauthToken.-

    return this.http
      .post(
        API + '/user/login', 
        { userName, password }, 
        { observe: 'response'} 
      )
      .pipe(tap(res => {
        const authToken = res.headers.get('x-access-token');
        this.userService.setToken(authToken);
        console.log(`User ${userName} authenticated with token ${authToken}`);
      }));
  }
}