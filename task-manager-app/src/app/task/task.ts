import { ParentTask } from "../parent-task/parent-task";

export class Task {

    taskId: number;
    task: string;

    startDate: Date;
    endDate: Date;
    priority: number;

    parentTask: ParentTask;

    taskComplete: boolean;

    constructor(taskId: number, taskDesc: string, startDate: Date, endDate: Date, priority: number, parentTask: ParentTask, taskCompleted: boolean) {
        this.taskId = taskId;
        this.task = taskDesc;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.parentTask = parentTask;
        this.taskComplete = taskCompleted;
    }

    public toString(): string {
        return "[ taskId:" + this.taskId + "  taskDesc:" + this.task + "  startDate:"
            + this.startDate + "  endDate:" + this.endDate + "  priority:" + this.priority + "  taskCompleted:" + this.taskComplete + "  parentTask:" + this.parentTask + "  ]";
    }

}