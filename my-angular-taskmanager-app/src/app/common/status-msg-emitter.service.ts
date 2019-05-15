import { Injectable, EventEmitter } from "../books1/node_modules/@angular/core";

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