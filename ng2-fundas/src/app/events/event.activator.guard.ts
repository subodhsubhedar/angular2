import { EventsService } from './shared/event.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class EventActivatorGuardService implements CanActivate {

    constructor(private eventService: EventsService, private router: Router) { }



    canActivate(router: ActivatedRouteSnapshot) {
        const eventExists = !!(this.eventService.getEvent(+router.params['id']));

        if (!eventExists) {
            this.router.navigate(['/404']);
        }

        return eventExists;
    }
}