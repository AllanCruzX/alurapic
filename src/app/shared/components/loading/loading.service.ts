import { Injectable} from "@angular/core";
import { LoadingType} from "./loading-type";
import { Subject, pipe } from "rxjs";
import { startWith } from 'rxjs/operators';

@Injectable({ providedIn : 'root'})
export class LoadingService {
        //Subject eu posso enviar uma informação voltada para ele e em outro lugar eu posso escutar essa informação voltada para ele.
    loadingSubject = new Subject<LoadingType>();

    getLoading() {
        //startWith -Defini o primeiro valor.
        return this.loadingSubject
        .asObservable()
        .pipe(startWith(LoadingType.STOPPED));
    }

    start() {
        this.loadingSubject.next(LoadingType.LOADING)
    }

    stop() {
        this.loadingSubject.next(LoadingType.STOPPED);
    }
}