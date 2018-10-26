import { EventsService } from './events/shared/event.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { EventsAppComponent } from './events-app.component';
import { EventsListComponent } from './events/events-list.component';
import { EventThumbnailComponent } from './events/event.thumbnail.component';
import { NavBarComponent } from './nav/nav-bar.component';

@NgModule({
  declarations: [
    EventsAppComponent, EventsListComponent, EventThumbnailComponent,NavBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EventsService],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }
