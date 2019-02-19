import { CreateEventComponent } from './events/create-event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { ToasterWrapperService } from './common/toaster.service';
import { EventsService } from './events/shared/event.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event.thumbnail.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from '../routes';
import { ErrorHandler404Component } from './error/error.404.component';
import { EventActivatorGuardService } from './events/event.activator.guard';

@NgModule({
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    ErrorHandler404Component

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [EventsService, ToasterWrapperService,EventActivatorGuardService],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
