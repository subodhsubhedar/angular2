
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation/nav.component';
import { StatusMsgEmitterService } from './common-services/status-msg-emitter.service';

import { TaskManagerService } from './service/task-manager.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { HomeComponent } from './home/home.component';
import { ParentTaskManagerResolverService } from './service/parent-tasks.resolver.service';
import { TasksComponent } from './task/tasks.component';
import { TaskManagerHttpErrorInterceptor } from './common-services/task-manager.error.interceptor.service';
import { AddUpdateTaskComponent } from './task-add-update/task-add-update.component';
import { TaskActivateGuardAndResolverService } from './service/task.resolver.guard.service';
import { TasksManagerResolverService } from './service/tasks.resolver.service';
import { TasksFilterPipe } from './task/tasks.pipe';
import { TaskManagerBasicAuthInterceptor } from './common-services/task-manager.auth.interceptor.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './common-services/auth.service';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuardService } from './common-services/auth.guard.service';
import { DatePipe } from '@angular/common';
import { LoggingService } from './common-services/logging.service';
import { LogpublishersService } from './common-services/logging.publishers.service';

@NgModule({
  declarations: [
    AppComponent, NavigationBarComponent,
    TasksComponent, AddUpdateTaskComponent, HomeComponent, LoginComponent, LogoutComponent, TasksFilterPipe
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'viewAllTasks',
        component: TasksComponent,
        canActivate: [AuthGuardService],
        resolve: {
          tasksList: TasksManagerResolverService,
          parentTasksList: ParentTaskManagerResolverService
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'addTask',
        component: AddUpdateTaskComponent,
        canActivate: [AuthGuardService],
        resolve: {
          tasksList: TasksManagerResolverService,
          parentTasksList: ParentTaskManagerResolverService,
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'updateTask/:taskId',
        component: AddUpdateTaskComponent,
        canActivate: [AuthGuardService, TaskActivateGuardAndResolverService],
        resolve: {
          parentTasksList: ParentTaskManagerResolverService,
          tasksList: TasksManagerResolverService,
          task: TaskActivateGuardAndResolverService
        },
        runGuardsAndResolvers: 'always'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuardService]
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

    ])],
  providers: [StatusMsgEmitterService,
    TaskManagerService,
    TasksManagerResolverService,
    ParentTaskManagerResolverService,
    TasksManagerResolverService,
    AuthGuardService,
    TaskActivateGuardAndResolverService,
    LoggingService,
    LogpublishersService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TaskManagerHttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TaskManagerBasicAuthInterceptor,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
