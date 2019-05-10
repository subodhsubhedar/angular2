import { StatusMsgEmitterService } from './status-msg-emitter.service';
import {
  HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()

export class TaskManagerHttpErrorInterceptor implements HttpInterceptor {

  constructor(private statusMsgEmitterService: StatusMsgEmitterService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      let errMsg = '';
      console.log('intercepting http error :' + JSON.stringify(error));
      if (error.error instanceof ErrorEvent) {
        //Client side error
        errMsg = "Error :" + error.error.message;
      } else {
        //Server side error

        let err: string[];
        if (error.error != null && error.error != undefined) {
          err = error.error.errors;


          if (err != undefined) {
            console.log("err :" + err.length);
            let errTxt = '';
            err.forEach(errItem => {
              errTxt = errTxt.concat("\n" + errItem);
            });
            errMsg = errTxt;
            console.log(errMsg);
          }
        }
        errMsg = errMsg + "\nError Code : " + error.status + "\n, Error Status Text : " + error.statusText
          + "\n, Message : "+error.message;


      }

      this.statusMsgEmitterService.notifyError(errMsg);
      console.log('Notified status msg service :'+errMsg);
      return throwError(errMsg);
    }
    ))
  }

}