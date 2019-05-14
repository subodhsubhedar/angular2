import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()

export class TaskManagerBasicAuthInterceptor implements HttpInterceptor {

    constructor(private logger: LoggingService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with basic auth credentials if available
        this.logger.debug('TaskManagerBasicAuthInterceptor intercepted request..');

        if (sessionStorage.getItem('token')) {

            let currentUser = (sessionStorage.getItem('token'));
            this.logger.debug('Current user is : ', [currentUser]);

            if (currentUser) {
                this.logger.debug("Setting auth header..");
                request = request.clone({
                    setHeaders: {
                        Authorization: "Basic " + currentUser
                    }
                });
            }
        }
        this.logger.debug('TaskManagerBasicAuthInterceptor work done ..');

        return next.handle(request);
    }
}