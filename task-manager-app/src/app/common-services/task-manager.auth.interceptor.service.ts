import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class TaskManagerBasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        // add authorization header with basic auth credentials if available
        console.log('TaskManagerBasicAuthInterceptor intercepting..');

        if (sessionStorage.getItem('token')) {

            let currentUser = (sessionStorage.getItem('token'));
            console.log('currentUser..' + currentUser);

            if (currentUser) {
                request = request.clone({
                    setHeaders: {
                        Authorization: "Basic "+currentUser
                    }
                });
            }
        }
        return next.handle(request);
    }
}