

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TaskManagerService } from './task-manager.service';
import { Task } from '../task/task';
import { LoggingService } from '../common-services/logging.service';

@Injectable()
export class TaskActivateGuardAndResolverService implements CanActivate, Resolve<Task> {

    constructor(private taskManagerService: TaskManagerService, private router: Router, private logger: LoggingService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Task> {
        let taskId = +route.paramMap.get("taskId");
        this.logger.debug("TaskActivateGuardAndResolverService finding task by id from taskManagerService...", [taskId]);

        return this.taskManagerService.findTaskById(taskId);
    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        let taskId = +route.paramMap.get("taskId");

        this.logger.debug("TaskActivateGuardAndResolverService , checking Can activate ? for task id:" + taskId);

        if (isNaN(taskId) || taskId < 1) {
            this.logger.error("Invalid Task id :" + taskId);
            this.logger.debug("Navigating to viewAllTasks");
            alert("Invalid Task id :" + taskId);
            this.router.navigate(['/viewAllTasks']);
            return false;
        } else {
            this.logger.debug("TaskActivateGuardAndResolverService , flow activated for " + taskId);

            return true;
        }

    }
}