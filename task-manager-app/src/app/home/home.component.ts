import { StatusMsgEmitterService } from './../common-services/status-msg-emitter.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggingService } from '../common-services/logging.service';


@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {

  constructor(private router: Router, private statusMsgEmitterService: StatusMsgEmitterService, private logger: LoggingService) {
    this.statusMsgEmitterService.notifyMsg(null);
    this.statusMsgEmitterService.notifyError(null);
  }


  proceed(): void {
    this.logger.debug("Home component, navigating to viewAllTasks...");
    this.router.navigate(['/viewAllTasks']);
  }

}
