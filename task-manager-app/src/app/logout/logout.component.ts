import { StatusMsgEmitterService } from './../common-services/status-msg-emitter.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../common-services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../login/login.user';

@Component({

    templateUrl: '../login/login.component.html',
})
export class LogoutComponent implements OnInit, AfterViewInit {

    userModel: UserModel = new UserModel('', '');

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private statusMsgEmitterService: StatusMsgEmitterService

    ) { 
        this.statusMsgEmitterService.notifyError('');
        this.statusMsgEmitterService.notifyMsg('');
    }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        this.logout();
    }

    logout() {
        console.log('removing token from session storage..')
        let isLoggedOut = this.authService.logout();
        if (isLoggedOut) {
            this.statusMsgEmitterService.notifyMsg('User logged out Successfully.');
            this.router.navigate(['/login']);
        } else {
            this.statusMsgEmitterService.notifyMsg('Problem encountered in logout operation.');
        }
    }

    login(){}
}