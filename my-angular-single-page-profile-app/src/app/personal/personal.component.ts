import { Component, OnInit } from '@angular/core';
import { Utils } from '../common/utils';

@Component({
    selector: 'app-personal-dtls',
    templateUrl: 'personal.component.html'
})
export class PersonalDetailsComponent implements OnInit {

    newQlfctnItemArray: string[] = [];

    addQlfctnIpText: string;

    constructor() { }

    ngOnInit() {

    }

    addQualifications(): void {
        Utils.addItem(this.addQlfctnIpText ,  this.newQlfctnItemArray)
    }

    removeQualification(indx): void {
        Utils.removeItemByIndex(indx,this.newQlfctnItemArray)
    }
}   