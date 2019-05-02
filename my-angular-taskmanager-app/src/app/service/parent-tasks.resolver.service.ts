

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TaskManagerService } from './task-manager.service';
import { ParentTask } from '../parent-task/parent-task';

@Injectable()
export class ParentTaskManagerResolverService implements Resolve<ParentTask[]> {

    constructor(private taskManagerService: TaskManagerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<ParentTask[]> {
        return this.taskManagerService.findAllParentTasks();
    }
}