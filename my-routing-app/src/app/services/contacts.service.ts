import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Contacts } from './contacts';

@Injectable()
export class ContactsService {

    constructor() { }
    contacts: Array<Contacts> = [

        { id: 1, name: "Rakesh", mobile: 98878789898 },
        { id: 2, name: "Mahesh", mobile: 98878789898 },
        { id: 3, name: "Vikram", mobile: 98878789898 },
        { id: 4, name: "Vineet", mobile: 98878789898 },
        { id: 5, name: "Robin", mobile: 98878789898 },
    ];

    /**
     * 
     */
    getContacts() {
        return Observable.create(observer => {
            observer.next(this.contacts);
        })

    }

    /**
     * 
     * @param contactId 
     */
    findContact(contactId: number) {
        console.log("calling find contact")
        return Observable.create(observer => {
            setTimeout(() => { observer.next(this.contacts.find(contact => contact.id == contactId)) }, 5000);
        }
        )
    }

}