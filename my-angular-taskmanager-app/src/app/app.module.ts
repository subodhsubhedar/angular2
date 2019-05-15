
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation/nav.component';
import { StatusMsgEmitterService } from './common/status-msg-emitter.service';

import { TaskManagerService } from './service/task-manager.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookDetailsComponent } from './books1/book-details.component';
import { BookDetailsActivateGuard } from './books1/book-details.guard';
import { AddUpdateBookComponent } from './books1/book-add-update.component';
import { LibraryAddBookResolverService } from './books1/book-add.resolver.sevice';
import { HomeComponent } from './home/home.component';
import { LibraryHttpErrorInterceptor } from './common/library.error.service';
import { ParentTaskManagerResolverService } from './service/parent-tasks.resolver.service';
import { TasksComponent } from './task/tasks.component';
import { TasksManagerResolverService } from './service/tasks.resolver.service';
import { TaskManagerHttpErrorInterceptor } from './common/task-manager.error.service';
import { AddUpdateTaskComponent } from './task-add-update/task-add-update.component';
import { TaskResolverService, TaskActivateGuardAndResolverService } from './service/task.resolver.guard.service';

@NgModule({
  declarations: [
    AppComponent, NavigationBarComponent,
    TasksComponent, BookDetailsComponent, AddUpdateBookComponent, HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'viewAllTasks',
        component: TasksComponent,
        resolve: {
          tasksList: TasksManagerResolverService,
          parentTasksList: ParentTaskManagerResolverService
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'addTask',
        component: AddUpdateTaskComponent,
        resolve: {
          parentTasksList: ParentTaskManagerResolverService,
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'updateTask/:taskId',
        component: AddUpdateTaskComponent,
        canActivate: [TaskActivateGuardAndResolverService],
        resolve: {
          parentTasksList: ParentTaskManagerResolverService,
          task: TaskActivateGuardAndResolverService
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
      }

    ]
    )],
  providers: [StatusMsgEmitterService,
    TaskManagerService,
    TasksManagerResolverService,
    ParentTaskManagerResolverService,
    TaskResolverService,
    TaskActivateGuardAndResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TaskManagerHttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
