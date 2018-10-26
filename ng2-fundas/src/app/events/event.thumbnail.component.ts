import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    templateUrl: './event.thumbnail.component.html'
})
export class EventThumbnailComponent implements OnInit {
    @Input() event: any;
    @Output() eventClicked = new EventEmitter();
    someProp : string = "Some property from child comp";

    constructor() { }

    ngOnInit() {

    }

    handleClick() {
        this.eventClicked.emit("Received :"+this.event.name);
    }
    handleTestTemplVar(){
        console.log("Tested temp variable flow !!");
    }

}