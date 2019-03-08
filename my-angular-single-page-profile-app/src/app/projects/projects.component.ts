import { Project } from './project';
import { Component, OnInit } from '@angular/core';
import { Utils } from '../common/utils';

@Component({
    selector: 'app-projects',
    templateUrl: 'projects.component.html'
})
export class ProjectsComponent implements OnInit {
    addProjectName: string;
    addProjectDesc: string;

    newProjectItemArray: Project[] = [];

    constructor() { }

    ngOnInit() {

    }

    addProject(): void {
        if (this.addProjectName && this.addProjectDesc) {
            Utils.addItem((new Project(this.addProjectName, this.addProjectDesc)),
                this.newProjectItemArray)
        }else{
            alert("Please provide project name and description both.")
        }
    }

    removeProject(indx): void {
        Utils.removeItemByIndex(indx, this.newProjectItemArray)
    }

}  