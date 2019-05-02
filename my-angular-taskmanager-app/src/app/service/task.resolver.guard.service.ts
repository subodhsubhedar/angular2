

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { TaskManagerService } from './task-manager.service';
import { Task } from './task';

@Injectable()
export class TaskActivateGuardAndResolverService implements CanActivate, Resolve<Task[]> {

    constructor(private taskManagerService: TaskManagerService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Task> {
        let taskId = +route.paramMap.get("taskId");
        return this.taskManagerService.findTaskById(taskId);
    }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        let taskId = +route.paramMap.get("taskId");

        console.log("TaskActivateGuardAndResolverService, Can activate ? :" + taskId);

        if (isNaN(taskId) || taskId < 1) {
            alert("Invalid Task id :" + taskId);
            this.router.navigate(['/viewAllTasks']);
            return false;
        } else {

            return true;
        }

    }
}