import { StatusMsgEmitterService } from './../common-services/status-msg-emitter.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../common-services/auth.service';
import { Router } from '@angular/router';
import { UserModel } from '../login/login.user';
import { LoggingService } from '../common-services/logging.service';

@Component({

    templateUrl: '../login/login.component.html',
})
export class LogoutComponent implements OnInit, AfterViewInit {

    userModel: UserModel = new UserModel('', '');

    constructor(
        private authService: AuthenticationService,
        private router: Router,
        private statusMsgEmitterService: StatusMsgEmitterService,
        private logger: LoggingService

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
        this.logger.debug('Logout Component, intiating logout with auth sevice');

        let isLoggedOut = this.authService.logout();
        if (isLoggedOut) {
            this.logger.debug('Logout successful.');
            this.statusMsgEmitterService.notifyMsg('User logged out Successfully.');
            this.router.navigate(['/login']);
        } else {
            this.logger.debug('Problem occured in Logout.');
            this.statusMsgEmitterService.notifyMsg('Problem encountered in logout operation.');
        }
    }

    login(){}
}