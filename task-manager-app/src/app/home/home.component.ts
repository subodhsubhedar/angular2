import { StatusMsgEmitterService } from './../common-services/status-msg-emitter.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {

  constructor(private router: Router, private statusMsgEmitterService: StatusMsgEmitterService) {
    this.statusMsgEmitterService.notifyMsg(null);
    this.statusMsgEmitterService.notifyError(null);
  }
  

  proceed(): void {
    this.router.navigate(['/viewAllTasks']);
  }

}
