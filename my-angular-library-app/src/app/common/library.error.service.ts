import { StatusMsgEmitterService } from './status-msg-emitter.service';
import {
    HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class LibraryHttpErrorInterceptor implements HttpInterceptor {

    constructor(private statusMsgEmitterService: StatusMsgEmitterService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(retry(1), catchError((error: HttpErrorResponse) => {
            let errMsg = '';
            if (error.error instanceof ErrorEvent) {
                //Client side error
                errMsg = "Error :" + error.error.message;
            } else {
                //Server side error
                let err: string[] = error.error.errors;
                console.log("err :" + err.length);
                let errTxt = '';
                err.forEach(errItem => {
                    errTxt = errTxt.concat("\n" + errItem);
                });
                errMsg = "Error Code : " + error.status + "\nError Status Text : " + error.statusText
                    + "\nMessage : " + errTxt;
                console.log(errMsg);
            }
            //   window.alert(errMsg);

            this.statusMsgEmitterService.notifyMsg(errMsg);
            return throwError(errMsg);
        }
        ))
    }

}