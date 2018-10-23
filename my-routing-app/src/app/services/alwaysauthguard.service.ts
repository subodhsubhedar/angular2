import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable()
export class AlwaysAuthGuardService implements CanActivate {

    constructor(private loginService: LoginService, private router : Router) { }

    canActivate() {

        if (this.loginService.isAuthenticated) {
            return true;
        } else {
            this.router.navigate([""]);
            return false;
        }
    }

}