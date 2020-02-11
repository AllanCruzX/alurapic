import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert, AlertType } from './alert';
import { Router, NavigationStart } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class AlertService {

    // Sabemos que o componente estará ligado ao subject do alert, e os componentes que quiserem interagir com o componente de alerta enviarão a mensagem para esse subject. Podemos tanto emitir um valor para o subject, quanto realizar um subscribe.
    //Um Subject é um tipo genérico, isto é, o tipo que definirmos será o tipo de dado emitido.
    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepAfterRouteChange = false;

    constructor(router: Router) {

        router.events.subscribe(event => {
            if(event instanceof NavigationStart) {
                if(this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                }else{
                    this.clear();
                }
            }
        });

    }
    

     success(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    warning(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    danger(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }


    info(message: string, keepAfterRouteChange: boolean = false) {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

    private alert(alertType: AlertType, message: string , keepAfterRouteChange: boolean ) {

        this.keepAfterRouteChange = keepAfterRouteChange;

        this.alertSubject.next(new Alert(alertType, message));
    }

    getAlert() {
        return this.alertSubject.asObservable();
 }

 clear(){
     this.alertSubject.next(null);
 }
}