import { UserModel } from './login.user';
import { AuthenticationService } from '../common-services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

    userModel: UserModel;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    ngOnInit() {
        this.userModel = new UserModel(null, null);
        sessionStorage.setItem('token', '');
    }

    login() {

        let result = this.authService.login(this.userModel).subscribe(isValidUser => {
            if (isValidUser) {
                sessionStorage.setItem(
                    'token',
                    btoa(this.userModel.username + ':' + this.userModel.password));

                this.router.navigate(['']);
            } else {
                alert("Authentication failed.");
            }
        });



    }

} 