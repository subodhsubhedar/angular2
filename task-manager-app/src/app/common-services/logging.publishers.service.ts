import { Injectable } from '@angular/core';
import { LocalLogStorage, LogConsole, LogPublisher } from './logging.service';

@Injectable()
export class LogpublishersService {

    publishers: LogPublisher[] = [];

    constructor() {

        this.publishers.push(new LogConsole());

        this.publishers.push(new LocalLogStorage());
    }

}