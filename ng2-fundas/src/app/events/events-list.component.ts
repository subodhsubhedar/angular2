import { EventsService } from './shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ToasterWrapperService } from '../common/toaster.service';

@Component({
    selector: 'events-list',
    template: `
    <div>
    <h1>Upcoming Angular events</h1>
    <hr />
    <div class="row">

    <div class="col-md-5 well hoverwell thumbnail" *ngFor="let eventCurr of events1" >

                <event-thumbnail #thumbnail [event]="eventCurr" (eventClicked)="handleEventClicked($event)"  (click)="hadleThumbnailClick(eventCurr)">
                </event-thumbnail>

                    <!--  <h2> {{thumbnail.someProp}}</h2> 
                    <button class="btn btn-primary" (click)="thumbnail.handleTestTemplVar()">#thumbnail template variable demo!</button>
                    -->

            </div>
        </div>

    </div>
    
    
    `

})
export class EventsListComponent implements OnInit {

    constructor(private eventService: EventsService, private toasterWrapperService: ToasterWrapperService) { }

    events1: any[];

    ngOnInit() {
        this.events1 = this.eventService.getEvents();
    }

    handleEventClicked(data) {
        console.log("from parent component -" + data);

    }
 
    hadleThumbnailClick(event) {
    //    this.toasterWrapperService.doSuccess(event.name);

    }

}