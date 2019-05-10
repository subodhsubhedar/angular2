import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common-services/auth.service';

@Component({
    selector: 'app-nav',
    templateUrl: 'nav.component.html'
})
export class NavigationBarComponent implements OnInit {

    private _isUSerLoggedIn: boolean;
    public get isUSerLoggedIn(): boolean {
        return this._isUSerLoggedIn;
    }
    public set isUSerLoggedIn(value: boolean) {
        this._isUSerLoggedIn = value;
    }

    constructor(private authService: AuthenticationService) { }

    ngOnInit() {
        this.authService.isUserLoggedIn.subscribe(isLoggedIn => this._isUSerLoggedIn = isLoggedIn);
    }

}