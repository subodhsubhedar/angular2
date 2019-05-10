import { UserModel } from '../login/login.user';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

    private taskManagerUrl: string = "http://localhost:8085/login";

    @Output() isUserLoggedIn: EventEmitter<any> = new EventEmitter();

    private _loggedInUserName: string;
    public get loggedInUserName(): string {
        return this._loggedInUserName;
    }
    public set loggedInUserName(value: string) {
        this._loggedInUserName = value;
    }

    constructor(private http: HttpClient) {
    }

    login(user: UserModel): boolean {
        console.log("Calling login service...");
        console.log('REQUEST TO ADD JSON :' + JSON.stringify(user))

        let authData = btoa(user.username + ":" + user.password);

        let authHdr = new HttpHeaders({
            Authorization: "Basic " + authData
        });

          let retVal = true;

        this.http.get<boolean>(this.taskManagerUrl,
            { headers: authHdr }
        ).subscribe(
            loginSuccess => {
                console.log('login returned :' + loginSuccess)
                if (loginSuccess) {

                    sessionStorage.setItem(
                        'token',
                        authData);

                    this.isUserLoggedIn.emit(true);
                    this._loggedInUserName = user.username;
            
                } else {
                    this.isUserLoggedIn.emit(false);
                    this._loggedInUserName = null;
            
                }
            }
        );
        console.log('retVal :' + retVal);
        return retVal;
    }

    logout(): boolean {
        sessionStorage.removeItem('token');
        //check if removed properly
        let userExists = sessionStorage.getItem('token');
        if (userExists) {
            return false;
        } else {
            this.isUserLoggedIn.emit(false);
            return true;
        }
    }

    checkUserLoggedIn(): boolean {
        let user = sessionStorage.getItem('token');
        if (user) {
            return true;
        } else {
            return false;
        }
    }

}
