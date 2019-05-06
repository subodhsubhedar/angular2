import { Component, OnInit } from '@angular/core';
import { StatusMsgEmitterService } from '../common-services/status-msg-emitter.service';
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
  filteredTasks: Task[];
  defaultParentTaskId: number;


  private _searchTaskDesc: string;
  private _searchStartDate: Date;
  private _searchEndDate: Date;
  private _searchPriorityFrom: number;
  private _searchPriorityTo: number;
  private _searchParentTask: number;

  ngOnInit() {

  }

  constructor(private taskManagerService: TaskManagerService, private route: ActivatedRoute,
    private router: Router, private statusMsgService: StatusMsgEmitterService) {
    console.log("Calling taskManagerService");

    this.allTasksList = route.snapshot.data['tasksList'];
    this.allParentTasksList = route.snapshot.data['parentTasksList']

    this.defaultParentTaskId = 0;
    this._searchParentTask = this.defaultParentTaskId;

    this.filteredTasks = this.allTasksList;
    this.statusMsgService.notifyMsg('');

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


//Getter ans Setters
 public get searchTaskDesc(): string {
        return this._searchTaskDesc;
    }
    public set searchTaskDesc(value: string) {
        this._searchTaskDesc = value;
    }

    public get searchStartDate(): Date {
        return this._searchStartDate;
    }
    public set searchStartDate(value: Date) {
        this._searchStartDate = value;
    }
  
    public get searchEndDate(): Date {
        return this._searchEndDate;
    }
    public set searchEndDate(value: Date) {
        this._searchEndDate = value;
    }

    public get searchPriorityFrom(): number {
        return this._searchPriorityFrom;
    }
    public set searchPriorityFrom(value: number) {
        this._searchPriorityFrom = value;
    }

    public get searchPriorityTo(): number {
        return this._searchPriorityTo;
    }
    public set searchPriorityTo(value: number) {
        this._searchPriorityTo = value;
    }

    public get searchParentTask(): number {
        return this._searchParentTask;
    }
    public set searchParentTask(value: number) {
        this._searchParentTask = value;
    }


}