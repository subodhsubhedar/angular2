import { LoggingService } from './common-services/logging.service';
import { Component } from '@angular/core';
import { StatusMsgEmitterService } from './common-services/status-msg-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-task-manager-app';
  notifications: string;
  errors: string;

  constructor(private statusMsgEmitterService: StatusMsgEmitterService, private logger :LoggingService) {
    this.logger.debug('AppComponent initialized..');
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
