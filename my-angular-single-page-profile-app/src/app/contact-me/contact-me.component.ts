import { StatusMsgEmitterService } from './../common/status-msg-emitter.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './contact';
import { ContactService } from './contact.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'contact.component.html'
})
export class ContactMeComponent implements OnInit {

    contact: Contact = new Contact("", 0, "", "");

    notificationMsg: string;

    constructor(private contactService: ContactService, private router: Router, private msgEmitterService: StatusMsgEmitterService) { }

    ngOnInit() {

    }

    contactMe(): void {
        if (this.contact) {
            status = this.contactService.sendContactDtls(this.contact);
            if (status == "success") {
                this.msgEmitterService.notifyMsg(this.contact.salutation+" "+this.contact.userName + ", your contact details have been received, I will get back to you at the earliest !");
                this.router.navigate(["/profileSummary"]);
            }
        }
    }

}  