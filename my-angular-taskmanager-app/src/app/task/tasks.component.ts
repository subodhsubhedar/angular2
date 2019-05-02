import { Component, OnInit } from '@angular/core';
import { StatusMsgEmitterService } from '../common/status-msg-emitter.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Task } from './task';
import { TaskManagerService } from '../service/task-manager.service';
import { ParentTask } from '../parent-task/parent-task';


@Component({
    templateUrl: 'tasks.component.html'
})
export class TasksComponent implements OnInit {

    allTasksList: Task[];

    allParentTasksList: ParentTask[];

    _tasksListFilter: Task;
    priorityFrom: number;
    priorityTo: number;

    filteredTasks: Task[];

    defaultParentTaskId: number;

    ngOnInit() {

    }

    constructor(private taskManagerService: TaskManagerService, private route: ActivatedRoute,
        private router: Router, private statusMsgService: StatusMsgEmitterService) {
        console.log("Calling taskManagerService");

        this.allTasksList = route.snapshot.data['tasksList'];
        this.allParentTasksList = route.snapshot.data['parentTasksList']

        this.defaultParentTaskId = 0;

        this._tasksListFilter = new Task(null, null, null, null, null, new ParentTask(0, null), null);
        this.filteredTasks = this.allTasksList;
        this.statusMsgService.notifyMsg('');

    }


    get tasksListFilter(): Task {
        return this._tasksListFilter;
    }

    set tasksListFilter(value: Task) {
        this._tasksListFilter = value;
        this.filteredTasks = this._tasksListFilter ? this.performFilter(this._tasksListFilter, this.priorityFrom, this.priorityTo) : this.allTasksList;
    }

    performFilter(filterByTaskObj: Task, priorityFrom: number, priorityTo: number): Task[] {

        return this.allTasksList.filter((task: Task) => {
            (task.taskDesc.toLowerCase().indexOf(filterByTaskObj.taskDesc) != -1)
                &&
                (priorityFrom != null && (task.priority >= priorityFrom))
                &&
                (priorityTo != null && (task.priority <= priorityTo))
                &&
                (filterByTaskObj.startDate != null && (task.startDate >= filterByTaskObj.startDate))
                &&
                (filterByTaskObj.endDate != null && (task.endDate <= filterByTaskObj.endDate))
                &&
                (filterByTaskObj.parentTask != null && (task.parentTask.parentTaskDesc.toLowerCase().indexOf(filterByTaskObj.parentTask.parentTaskDesc) != -1))
        }
        );

    }

    onDeleteTask(task: Task): void {
        let deleteTaskDesc = task.taskDesc;
        var answer = confirm("Are you sure you want to delete : " + deleteTaskDesc);
        if (answer) {
            console.log('calling delete for : ' + task.taskId);

            this.taskManagerService.deleteTask(task.taskId).subscribe(res => {
                console.log('Delete done callback ' + JSON.stringify(res));
                console.log('Delete performed successfully ');
                this.statusMsgService.notifyMsg('Task with desc : "' + deleteTaskDesc + '" deleted successfully.');

                //refresh the model
                this.taskManagerService.findAllTasks().subscribe(taskListData => {
                    this.allTasksList = taskListData;
                    this.filteredTasks = this.allTasksList;
                })
            });
        }
    }

    onEditTask(taskId: number): void {
        this.router.navigate(['/updateTask', taskId]);
    }

    onEndTask(task: Task): void {
        let endTaskDesc = task.taskDesc;
        var answer = confirm("Are you sure you want to End the task : '" + endTaskDesc + "' ? /nThe task will be marked as finished & no longer be available for any updates.");
        if (answer) {
            console.log('calling end task for : ' + task.taskId);
            //set end date to current date and set completion flag
            task.taskCompleted = true;
            task.endDate = new Date();

            this.taskManagerService.updateTask(task).subscribe(res => {

                console.log("Update end task done successfully !! ..");
                this.statusMsgService.notifyMsg('Task : "' + res.taskDesc + '" marked as finished successfully.');
                this.statusMsgService.notifyError('');

                //refresh the model
                this.taskManagerService.findAllTasks().subscribe(taskListData => {
                    this.allTasksList = taskListData;
                    this.filteredTasks = this.allTasksList;
                })
            });
        }
    }

}