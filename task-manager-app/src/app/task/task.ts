import { ParentTask } from "../parent-task/parent-task";

export class Task {

    taskId: number;
    taskDesc: string;

    startDate: Date;
    endDate: Date;
    priority: number;

    parentTask: ParentTask;

    taskCompleted: boolean;

    constructor(taskId: number, taskDesc: string, startDate: Date, endDate: Date, priority: number, parentTask: ParentTask, taskCompleted: boolean) {
        this.taskId = taskId;
        this.taskDesc = taskDesc;
        this.startDate = startDate;
        this.endDate = endDate;
        this.priority = priority;
        this.parentTask = parentTask;
        this.taskCompleted = taskCompleted;
    }

    public toString(): string {
        return "[ taskId:" + this.taskId + "  taskDesc:" + this.taskDesc + "  startDate:"
            + this.startDate + "  endDate:" + this.endDate + "  priority:" + this.priority + "  taskCompleted:" + this.taskCompleted + "  parentTask:" + this.parentTask + "  ]";
    }

}