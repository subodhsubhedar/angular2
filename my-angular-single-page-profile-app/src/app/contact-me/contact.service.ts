import { Contact } from './contact';
import { Injectable } from '@angular/core';

@Injectable(

)
export class ContactService {

    public sendContactDtls(contact: Contact): string {

        console.log("Contact Service sending contact dtls to backend : " + contact);

        //Rest service call can be placed here..

        return "success";
    }


}   