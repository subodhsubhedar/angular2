import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class StatusMsgEmitterService {
    msgEmitter: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    notifyMsg(msg: string) {
        this.msgEmitter.emit(msg);
    }
}