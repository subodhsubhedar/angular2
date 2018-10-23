import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {

    isAuthenticated: boolean = false;
    constructor(private http: Http) {

    }

    authenticateUser(): Promise<any> {
        return this.http.get("/assets/dummy-user.json").toPromise().then(res => res.json()).then(

            data => {
                if (data.auth) {
                    this.isAuthenticated = true;
                } else {
                    this.isAuthenticated = false;
                }
                return data;
            }

        );
    }

}