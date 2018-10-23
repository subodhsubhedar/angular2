import { ContactsService } from './contacts.service';
import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ContactResolve implements Resolve<any> {

    //contact: Contacts;
    constructor(public contactsService: ContactsService) { }

    resolve(route: ActivatedRouteSnapshot) {
        console.log(route.params['id']);
       
        return this.contactsService.findContact(route.params['id'])

        //.subscribe((data => { console.log(data) }));
    }
}  