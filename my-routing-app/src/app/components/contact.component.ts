import { ContactsService } from './../services/contacts.service';
import { Contacts } from './../services/contacts';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-contact',
    template: `
    <h2>Displaying contact details</h2>
    <p>Contact ID {{contact?.id}}</p>
    <p>Contact Name {{contact?.name}}</p>
    <p>Contact Mobile {{contact?.mobile}}</p>  
    
    `   
})
export class ContactComponent implements OnInit {
    
    contact: Contacts

    constructor(public activatedRoute: ActivatedRoute, public contactService: ContactsService) { }

    ngOnInit() {
        this.contact = this.activatedRoute.snapshot.data['resolvedContact'];
       /* .subscribe((data => { console.log(data);
            this.contact = data;
        }));*/
        console.log("Contact component :"+ this.contact);

    }

} 