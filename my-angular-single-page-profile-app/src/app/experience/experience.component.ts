import { Component, OnInit } from '@angular/core';
import { Utils } from '../common/utils';

@Component({
    selector: 'app-experience',
    templateUrl: 'experience.component.html'
})
export class ExperienceComponent implements OnInit {


    newExperItemArray: string[] = [];

    addExperIpText: string;

    constructor() { }

    ngOnInit() {

    }

    addExper(): void {
        Utils.addItem(this.addExperIpText, this.newExperItemArray)
    }

    removeExper(indx): void {
        Utils.removeItemByIndex(indx, this.newExperItemArray)
    }
}