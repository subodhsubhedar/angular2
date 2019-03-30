import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class StatusMsgEmitterService {
    msgEmitter: EventEmitter<string> = new EventEmitter<string>();

    errMsgEmitter: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    notifyMsg(msg: string) {
        this.msgEmitter.emit(msg);
    }

    notifyError(msg: string) {
        this.errMsgEmitter.emit(msg);
    }
}