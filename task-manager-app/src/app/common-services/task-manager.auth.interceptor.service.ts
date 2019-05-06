import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class TaskManagerBasicAuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  

        // add authorization header with basic auth credentials if available
        console.log('TaskManagerBasicAuthInterceptor intercepting..');
        let currentUser = JSON.parse(localStorage.getItem('token'));
        if (currentUser && currentUser.authdata) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Basic ${currentUser.authdata}"
                }
            });
        }
        
       
      /* request = request.clone({
        setHeaders: {
            Authorization: "Basic "+  btoa("subodh:subodh123")
        }
     });*/

        return next.handle(request);
    }
}