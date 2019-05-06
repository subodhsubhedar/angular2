import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common-services/auth.service';
import { Router } from '@angular/router';

@Component({

    templateUrl: '../login/login.component.html',
})
export class LogoutComponent implements OnInit {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    ngOnInit() {
        sessionStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}