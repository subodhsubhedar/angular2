import { ContactsService } from './../services/contacts.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-profile',
    template: `
    <h2> Welcome to Profile Component</h2>
    <ul>

    <li *ngFor="let contact of contacts|async">
       <a routerLink="/contacts/{{contact.id}}" >{{contact.name}}</a>
    </li>
 
    </ul>


    `

})

export class ProfileComponent implements OnInit {
    contacts = [];

    constructor(private contactService: ContactsService) {

    }

    ngOnInit(): void {
        this.contacts = this.contactService.getContacts();

    }



}