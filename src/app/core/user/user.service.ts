import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import * as jtw_decode from 'jwt-decode';

@Injectable({ providedIn: 'root'})//uma unica instancia para todos os seviços ao ser injetado.
export class UserService { 
    //Após a emissão de um valor, caso este não seja consumido ou escutado, o BehaviorSubject o manterá armazenado. E se alguém faz o subscribe depois, terá acesso ao último valor emitido.
    //O BehaviorSubject armazena a última emissão até que alguém apareça para consumi-la.

    private userSubject = new BehaviorSubject<User>(null);
    private userName: string;

    constructor(private tokenService: TokenService) { 

        this.tokenService.hasToken() && 
            this.decodeAndNotify();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.tokenService.getToken();
        const user = jtw_decode(token) as User;//<- (aqui a chamada jwt_decode)
        this.userName = user.name;
        this.userSubject.next(user);
    }

    logout() {
        this.tokenService.removeToken();
        this.userSubject.next(null);
    }

    isLogged() {
        return this.tokenService.hasToken();
    }

    getUserName() {
        return this.userName;
    }
}