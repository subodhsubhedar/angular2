

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TaskManagerService } from './task-manager.service';
import { Task } from '../task/task';
import { LoggingService } from '../common-services/logging.service';

@Injectable()
export class TasksManagerResolverService implements Resolve<Task[]> {

    constructor(private taskManagerService: TaskManagerService, private logger: LoggingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Task[]> {
        this.logger.debug('TasksManagerResolverService resolving findAllTasks with taskManagerService...');
        return this.taskManagerService.findAllTasks();
    }
}