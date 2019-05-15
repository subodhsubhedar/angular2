import { Subject } from './../subject/subject';
import { Book } from '../books1/book';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Task } from '../task/task';
import { ParentTask } from '../parent-task/parent-task';

@Injectable()
export class TaskManagerService {
    private taskManagerUrl: string = "http://localhost:8085/";

    constructor(private http: HttpClient) { }

    findAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.taskManagerUrl + "tasks").pipe(
            tap(data => console.log(JSON.stringify(data)))
        )
    }

    findAllParentTasks(): Observable<ParentTask[]> {
        return this.http.get<ParentTask[]>(this.taskManagerUrl + "parent-tasks").pipe(
            tap(data => console.log(JSON.stringify(data)))
        )
    }

    findTaskById(taskId: number): Observable<Task> {
        console.log("finding task by id : " + taskId);
        return this.http.get<Task>(this.taskManagerUrl + "task/" + taskId).
            pipe(tap(data => console.log('http get by task id responded')));
    }


    addTask(task: Task): Observable<Task> {
        console.log("Calling http post...");
        console.log('REQUEST TO ADD JSON :' + JSON.stringify(task))

        return this.http.post<Task>(this.taskManagerUrl + "task/add", task).
            pipe(tap(data => console.log('http post responded, data added succesfully :' + data)));
    }



    updateTask(task: Task): Observable<Task> {
        console.log("Calling http update...");
        console.log('REQUEST TO ADD JSON :' + JSON.stringify(task))

        return this.http.put<Task>(this.taskManagerUrl + "task/update", task).
            pipe(tap
                (data =>
                    console.log('http put responded, data updated succesfully :' + data)));
    }


    deleteTask(taskId: number): Observable<any> {
        return this.http.delete<Task>(this.taskManagerUrl + "task/delete/" + taskId).pipe(
            tap(data => console.log('deleted POST id tapped =' + taskId)),
        );
    }


}