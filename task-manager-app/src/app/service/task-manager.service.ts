import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Task } from '../task/task';
import { ParentTask } from '../parent-task/parent-task';
import { LoggingService } from '../common-services/logging.service';

@Injectable()
export class TaskManagerService {
  //  private taskManagerUrl: string = ".././assets/tasks.json";
  //  private parentTaskManagerUrl: string = ".././assets/parent-tasks.json";

  private taskManagerUrl: string = "http://localhost:8085/";

  constructor(private http: HttpClient, private logger: LoggingService) {
  }

  findAllTasks(): Observable<Task[]> {

    return this.http.get<Task[]>(this.taskManagerUrl + "tasks").pipe(
      tap(data => this.logger.debug('TaskManagerService findAllTasks returned : ', [data])
      )
    )
  }

  findAllParentTasks(): Observable<ParentTask[]> {
    return this.http.get<ParentTask[]>(this.taskManagerUrl + "parent-tasks").pipe(
      tap(data => this.logger.debug('TaskManagerService findAllParentTasks returned : ', [data])
      )
    )
  }

  findTaskById(taskId: number): Observable<Task> {
    this.logger.debug("TaskManagerService finding task by id : " + taskId);
    return this.http.get<Task>(this.taskManagerUrl + "task/" + taskId).
      pipe(tap(data =>
        this.logger.debug('TaskManagerService findTaskById returned : ', [data])
      ));
  }


  addTask(task: Task): Observable<Task> {
    this.logger.debug("TaskManagerService Calling http POST for new Task :", [task]);

    return this.http.post<Task>(this.taskManagerUrl + "task/add", task).
      pipe(tap(data => this.logger.debug('TaskManagerService addTask successful, returned : ', [data])
      ));
  }



  updateTask(task: Task): Observable<Task> {
    this.logger.debug("TaskManagerService Calling http PUT for updateTask :", [task]);

    return this.http.put<Task>(this.taskManagerUrl + "task/update", task).
      pipe(tap
        (data => this.logger.debug('TaskManagerService updateTask successful, returned : ', [data])
        ));
  }


  deleteTask(taskId: number): Observable<any> {
    return this.http.delete<Task>(this.taskManagerUrl + "task/delete/" + taskId).pipe(
      tap(data => this.logger.debug('TaskManagerService deleteTask responded as successful for  : ', [taskId])
      ),
    );
  }


}