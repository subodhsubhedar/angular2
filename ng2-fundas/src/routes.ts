import { EventActivatorGuardService } from './app/events/event.activator.guard';
import { EventDetailsComponent } from './app/event-details/event-details.component';
import { RouterModule, Routes } from '@angular/router';
import { EventsListComponent } from './app/events/events-list.component';
import { CreateEventComponent } from './app/events/create-event.component';
import { ErrorHandler404Component } from './app/error/error.404.component';

export const appRoutes: Routes = [
    { path: 'events/new', component: CreateEventComponent },
    { path: 'events', component: EventsListComponent },
    { path: 'event/:id', component: EventDetailsComponent, canActivate: [EventActivatorGuardService] },
    { path: '', pathMatch: 'full', redirectTo: '/events' },
    { path: '404', component: ErrorHandler404Component },
];

//export const appRoutes = RouterModule.forRoot(routes);