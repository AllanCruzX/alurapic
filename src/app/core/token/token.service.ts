import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({ providedIn: 'root'})
export class TokenService {

    hasToken() {
        return !!this.getToken();// !! tranforma o metodo para boolean se for nulo ele retorna false 
    }

    setToken(token) {
        window.localStorage.setItem(KEY, token);
    }

    getToken() {
        return window.localStorage.getItem(KEY);
    }

    removeToken() {
        window.localStorage.removeItem(KEY);
    }
}