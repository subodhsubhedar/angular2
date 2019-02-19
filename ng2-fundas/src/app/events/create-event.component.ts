import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'selector',
    template: `
    <h2>Create Component </h2>
    <button class="btn btn-default" (click)="handleCancel()">Cancel</button>
    
    `
})
export class CreateEventComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {

    }

    handleCancel() {

        this.router.navigate(['/events']);

    }

}