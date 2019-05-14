import { LoggingService } from './../common-services/logging.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusMsgEmitterService } from '../common-services/status-msg-emitter.service';
import { OnInit, Component } from '@angular/core';
import { Task } from '../task/task';
import { ParentTask } from '../parent-task/parent-task';
import { TaskManagerService } from '../service/task-manager.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    templateUrl: 'task-add-update.component.html',
    styleUrls: ['./task-add-update.component.css']
})
export class AddUpdateTaskComponent implements OnInit {

    task: Task = new Task(0, null, null, null, 0, new ParentTask(0, null), null);

    flow: string = "";

    parentTasksList: ParentTask[] = [];
    defaultParentTaskId: number;

    tasksList: Task[];

    constructor(private taskManagerService: TaskManagerService, private router: Router,
        private statusMsgService: StatusMsgEmitterService, private route: ActivatedRoute,
        private logger: LoggingService) {

        //this.parentTasksList = route.snapshot.data["parentTasksList"];

        this.tasksList = route.snapshot.data["tasksList"];
        this.logger.debug("AddUpdateTaskComponent tasksList : ", [this.tasksList]);

        if (this.route.snapshot.data['task']) {
            this.task = this.route.snapshot.data['task'];
        }
        this.logger.debug("AddUpdateTaskComponent Task retrieved : ", [this.task]);

        this.tasksList.forEach(tsk =>
            this.parentTasksList.push(new ParentTask((tsk.taskId), (tsk.task))
            ));

        if (this.task.taskId == 0) {
            this.flow = "add";
            this.defaultParentTaskId = 0;

        } else {
            this.flow = "update";

            if (!this.task.parentTask) {
                this.defaultParentTaskId = 0;
                this.task.parentTask = new ParentTask(this.defaultParentTaskId, null);
            }
            this.parentTasksList = this.parentTasksList.filter(parentTask => (
                (parentTask.parentId != this.task.taskId)
            ));
        }
        this.logger.debug("AddUpdateTaskComponent parentTasksList : " + this.parentTasksList);

        this.statusMsgService.notifyMsg('');
        this.statusMsgService.notifyError('');
    }

    ngOnInit() {

    }

    addNewTask(task: Task): void {
        this.logger.debug('AddUpdateTaskComponent Add request received for Task :' + this.task.task);

        this.logger.debug('AddUpdateTaskComponent Task obj is :', [task]);

        this.taskManagerService.addTask(this.task).subscribe(res => {
            this.logger.debug("AddUpdateTaskComponent add new Task done successfully !! ..");
            this.statusMsgService.notifyMsg('New Task : "' + res.task + '" added Successfully.');
            this.statusMsgService.notifyError('');

            this.router.navigate(['/viewAllTasks']);
        });
    }

    reset(addTaskForm: NgForm): void {
        this.logger.debug('AddUpdateTaskComponent reset form..');
        addTaskForm.resetForm();
    }

    cancelUpdate(): void {
        this.logger.debug('AddUpdateTaskComponent cancelUpdate, navigating to viewAllTasks..');
        this.router.navigate(['/viewAllTasks']);
    }


    updateTask(task: Task): void {

        this.logger.debug('AddUpdateTaskComponent Update request received for Task ' + this.task.task);

        this.logger.debug('AddUpdateTaskComponent task : ', [task]);

        let parentTask: ParentTask = this.parentTasksList.find(parentTsk => this.task.parentTask.parentId == parentTsk.parentId);
        this.logger.debug('AddUpdateTaskComponent parentTask : ', [parentTask]);

        if(parentTask){
                this.task.parentTask.parentTaskDesc = parentTask.parentTaskDesc;
        }

        this.taskManagerService.updateTask(this.task).subscribe(res => {
            this.logger.debug("AddUpdateTaskComponent Update Taask done successfully !! ..");
            this.statusMsgService.notifyMsg('Task : "' + res.task + '" updated Successfully.');
            this.statusMsgService.notifyError('');

            this.router.navigate(['/viewAllTasks']);
        });
    }

}  