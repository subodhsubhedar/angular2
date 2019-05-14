import { StatusMsgEmitterService } from './status-msg-emitter.service';
import {
  HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable()

export class TaskManagerHttpErrorInterceptor implements HttpInterceptor {

  constructor(private statusMsgEmitterService: StatusMsgEmitterService, private logger: LoggingService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(1), catchError((error: HttpErrorResponse) => {
      let errMsg = '';

      this.logger.error('Intercepting http error with TaskManagerHttpErrorInterceptor :', [error]);

      if (error.error instanceof ErrorEvent) {
        //Client side error
        this.logger.error('Looks like a client side error.')
        errMsg = "Error :" + error.error.message;
      } else {
        this.logger.error('Looks like a server side error.')
        //Server side error

        let err: string[];
        if (error.error != null && error.error != undefined) {
          err = error.error.errors;

          if (err != undefined) {

            this.logger.error("err :" + err.length);

            let errTxt = '';
            err.forEach(errItem => {
              errTxt = errTxt.concat("\n" + errItem);
            });
            errMsg = errTxt;
          }
        }
        errMsg = errMsg + "\nError Code : " + error.status + "\n, Error Status Text : " + error.statusText
          + "\n, Message : " + error.message;

      }

      this.statusMsgEmitterService.notifyError(errMsg);
      this.logger.error('Notifying error Msg servcie with errMsg as :' + errMsg);

      return throwError(errMsg);
    }
    ))
  }

}