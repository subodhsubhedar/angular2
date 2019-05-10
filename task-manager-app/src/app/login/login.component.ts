import { UserModel } from './login.user';
import { AuthenticationService } from '../common-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatusMsgEmitterService } from '../common-services/status-msg-emitter.service';

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
    ) {
        this.userModel = new UserModel('', '');
      
      
    }

    ngOnInit() {

    }

    login() {
        let loginReqSent = this.authService.login(this.userModel);

        if (loginReqSent) {
            this.authService.isUserLoggedIn.subscribe(isLoggedIn => 
                {this._isUSerLoggedIn = isLoggedIn;
                    console.log('isLoggedIn event emitted :'+isLoggedIn);
                    if (this._isUSerLoggedIn) {
                        console.log('loginReqSent: user status initiating navigation');
                        this.router.navigate(['']);
                    } 
                });
        }
    }

} 