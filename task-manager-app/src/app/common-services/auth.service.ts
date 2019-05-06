import { UserModel } from '../login/login.user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    private taskManagerUrl: string = "http://localhost:8085/login";

    constructor(private http: HttpClient) {
    }

    login(user: UserModel): Observable<boolean> {
        console.log("Calling login service...");
        console.log('REQUEST TO ADD JSON :' + JSON.stringify(user))

        return this.http.post<boolean>(this.taskManagerUrl,
            {
                userName: user.username,
                password: user.password
            }).
            pipe(tap(data => console.log('http login responded')));
    }

    isUserLoggedIn(): boolean {
        let user = sessionStorage.getItem('token');
        console.log(!(user === null));
        return !(user === null)
    }

}
