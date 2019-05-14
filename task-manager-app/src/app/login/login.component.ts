import { UserModel } from './login.user';
import { AuthenticationService } from '../common-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusMsgEmitterService } from '../common-services/status-msg-emitter.service';
import { LoggingService } from '../common-services/logging.service';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    userModel: UserModel;
    flowMsg: string;

    private _isUSerLoggedIn: boolean;
    public get isUSerLoggedIn(): boolean {
        return this._isUSerLoggedIn;
    }
    public set isUSerLoggedIn(value: boolean) {
        this._isUSerLoggedIn = value;
    }

    constructor(
        private router: Router,
        private authService: AuthenticationService,
        private statusMsgService: StatusMsgEmitterService,
        private logger: LoggingService
    ) {
        this.userModel = new UserModel('', '');
      
      
    }

    ngOnInit() {

    }

    login() {
        this.logger.debug('Login controller, calling auth service to initiate login...');

        let loginReqSent = this.authService.login(this.userModel);

        if (loginReqSent) {
            this.authService.isUserLoggedIn.subscribe(isLoggedIn => 
                {this._isUSerLoggedIn = isLoggedIn;
                    this.logger.debug('isLoggedIn event subscription returned as :'+isLoggedIn);

                    if (this._isUSerLoggedIn) {
                        this.logger.debug('loginReq sucessful, initiating navigation to home page...')
                        this.router.navigate(['']);
                    } 
                });
        }
    }

} 