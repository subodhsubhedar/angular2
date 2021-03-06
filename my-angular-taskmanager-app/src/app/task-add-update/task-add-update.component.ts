import { Router, ActivatedRoute } from '@angular/router';
import { StatusMsgEmitterService } from '../common/status-msg-emitter.service';
import { OnInit, Component } from '@angular/core';
import { Task } from '../task/task';
import { ParentTask } from '../parent-task/parent-task';
import { TaskManagerService } from '../service/task-manager.service';


@Component({
    templateUrl: 'task-add-update.component.html',

})
export class AddUpdateTaskComponent implements OnInit {

    task: Task = new Task(null, null, null, null, null, new ParentTask(0, null), null);

    flow: string = "";

    parentTasksList: ParentTask[];
    defaultParentTaskId: number;

    constructor(private taskManagerService: TaskManagerService, private router: Router,
        private statusMsgService: StatusMsgEmitterService, private route: ActivatedRoute) {

        this.parentTasksList = route.snapshot.data["parentTasksList"];
        console.log("parentTasksList : " + this.parentTasksList);

        if (this.route.snapshot.data['task']) {
            this.task = this.route.snapshot.data['task'];
        }
        console.log("Task retrieved : " + this.task.toString());

        if (this.task.taskId == 0) {
            this.flow = "add";
            this.defaultParentTaskId = 0;
        } else {
            this.flow = "update";
        }

        this.statusMsgService.notifyMsg('');
        this.statusMsgService.notifyError('');
    }

    ngOnInit() {

    }

    addNewTask(task: Task): void {
        console.log('Add request received for Task :' + this.task.taskDesc);

        console.log('Task obj is :' + task.toString());

        this.taskManagerService.addTask(this.task).subscribe(res => {
            console.log("add new Task done success!! ..");
            this.statusMsgService.notifyMsg('New Task : "' + res.taskDesc + '" added Successfully.');
            this.statusMsgService.notifyError('');

            this.router.navigate(['/viewAllTasks']);
        });
    }

    updateTask(task: Task): void {
        console.log('Update request received for Task :' + this.task.taskDesc);
        console.log('Task obj is :' + task.toString());

        this.taskManagerService.updateTask(this.task).subscribe(res => {
            console.log("Update Taask done successfully !! ..");
            this.statusMsgService.notifyMsg('Task : "' + res.taskDesc + '" updated Successfully.');
            this.statusMsgService.notifyError('');

            this.router.navigate(['/viewAllTasks']);
        });
    }

}  