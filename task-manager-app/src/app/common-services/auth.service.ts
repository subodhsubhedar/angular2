import { UserModel } from '../login/login.user';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService, LogLevel } from './logging.service';

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

    constructor(private http: HttpClient, private logger: LoggingService) {
    }

    login(user: UserModel): boolean {

        this.logger.debug("AuthenticationService Calling login service logged through logger");
        this.logger.debug("AuthenticationService REQUEST TO Authenticate  :", [user.username]);

        let authData = btoa(user.username + ":" + user.password);

        let authHdr = new HttpHeaders({
            Authorization: "Basic " + authData
        });

        let retVal = true;

        this.http.get<boolean>(this.taskManagerUrl,
            { headers: authHdr }
        ).subscribe(
            loginSuccess => {
                this.logger.debug('AuthenticationService login returned :' + loginSuccess);

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
        this.logger.debug('AuthenticationService retVal :' + retVal);
        return retVal;
    }

    logout(): boolean {
        this.logger.debug("AuthenticationService Initiating Logout...")

        sessionStorage.removeItem('token');
        //check if removed properly
        let userExists = sessionStorage.getItem('token');
        if (userExists) {
            this.logger.debug("AuthenticationService User still exists even after Logout...")
            return false;
        } else {
            this.logger.debug("AuthenticationService User Logged out sucessfully...")
            this.isUserLoggedIn.emit(false);
            return true;
        }
    }

    checkUserLoggedIn(): boolean {
        this.logger.debug("AuthenticationService Check if user logged in ..");
        let user = sessionStorage.getItem('token');
        if (user) {
            this.logger.debug("AuthenticationService User is logged in.");
            return true;
        } else {
            this.logger.debug("AuthenticationService User is logged out.");
            return false;
        }
    }

}
