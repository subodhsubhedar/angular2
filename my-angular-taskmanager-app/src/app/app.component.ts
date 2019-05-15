import { Component } from '@angular/core';
import { StatusMsgEmitterService } from './common/status-msg-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-task-manager-app';
  notifications: string;
  errors: string;

  constructor(private statusMsgEmitterService: StatusMsgEmitterService) {
    statusMsgEmitterService.msgEmitter.subscribe(message => this.onNotify(message));
    statusMsgEmitterService.errMsgEmitter.subscribe(message => this.onErrorNotify(message));
  }

  public onNotify(msg: string): void {
    this.notifications = msg;
  }

  public onErrorNotify(msg: string): void {
    this.errors = msg;
  }

}
