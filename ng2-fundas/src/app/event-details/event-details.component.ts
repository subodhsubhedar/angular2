import { EventsService } from './../events/shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './event-details.component.html'
})
export class EventDetailsComponent implements OnInit {

    event: any;
    constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {

        this.event = this.eventsService.getEvent(+this.activatedRoute.snapshot.params['id']);
     
    }

}