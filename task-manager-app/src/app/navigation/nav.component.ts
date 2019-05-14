import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../common-services/auth.service';
import { LoggingService } from '../common-services/logging.service';

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

    constructor(private authService: AuthenticationService, private logger: LoggingService) { }

    ngOnInit() {
        this.logger.debug('Navigation component subscribing to user logged in event...');
        this.authService.isUserLoggedIn.subscribe(isLoggedIn => this._isUSerLoggedIn = isLoggedIn);
    }

}