

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TaskManagerService } from './task-manager.service';
import { Task } from '../task/task';

@Injectable()
export class TasksManagerResolverService implements Resolve<Task[]> {

    constructor(private taskManagerService: TaskManagerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<Task[]> {
        return this.taskManagerService.findAllTasks;
    }
}