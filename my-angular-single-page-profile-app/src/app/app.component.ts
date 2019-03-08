import { Component } from '@angular/core';
import { StatusMsgEmitterService } from './common/status-msg-emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-single-page-profile-app';
  notifications: string;

  constructor(private statusMsgEmitterService: StatusMsgEmitterService) {
    statusMsgEmitterService.msgEmitter.subscribe(message => this.onNotify(message));

  }

  public onNotify(msg: string): void {
    this.notifications = msg;
  }

}
