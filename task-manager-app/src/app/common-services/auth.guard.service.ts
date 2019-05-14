import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './auth.service';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
        private authService: AuthenticationService,
        private logger: LoggingService
        ) { }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
      
        this.logger.debug("Check if user logged in..");
        if (this.authService.checkUserLoggedIn()) {
            this.logger.debug("User is logged currently..");
            return true;
        } else {
            this.logger.debug("User NOT logged in currently..navigating to login page.");
            this.router.navigate(['/login']);
        }

    }

}
