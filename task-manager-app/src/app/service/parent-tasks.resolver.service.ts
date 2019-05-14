

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TaskManagerService } from './task-manager.service';
import { ParentTask } from '../parent-task/parent-task';
import { LoggingService } from '../common-services/logging.service';

@Injectable()
export class ParentTaskManagerResolverService implements Resolve<ParentTask[]> {

    constructor(private taskManagerService: TaskManagerService, private logger: LoggingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<ParentTask[]> {
        this.logger.debug('ParentTaskManagerResolverService Finding all parents task from taskManagerService...');
        return this.taskManagerService.findAllParentTasks();
    }
}