import { Component } from '@angular/core';
import { StatusMsgEmitterService } from './common/status-msg.emitter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  notification: string = '';

  constructor(private statusMsgService: StatusMsgEmitterService) {
    statusMsgService.msgEmitter.subscribe(msg => this.onNotify(msg))
  }


  onNotify(msg: string): void {
    console.log('app compoenent notified :' + msg);
    this.notification = msg;
  }

}
