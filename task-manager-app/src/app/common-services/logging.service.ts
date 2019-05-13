
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { LogpublishersService } from './logging.publishers.service';

@Injectable()
export class LoggingService {
    level: LogLevel = LogLevel.All;
    logPublishers: LogPublisher[];

    constructor(private logpublishersService: LogpublishersService) {

        this.logPublishers = this.logpublishersService.publishers;
    }


    public log(msg: string, level: LogLevel, parms: any[]) {

        if (this.shouldLog(level)) {

            let entry: LogEntry = new LogEntry();
            entry.message = msg;
            entry.level = level;
            entry.additionalDetails = parms;
            console.log(entry.buildLogString());

            for (let logger of this.logPublishers) {

                logger.log(entry).subscribe(
                    res =>
                        console.log(res)
                )
            }

        }
    }

    private shouldLog(levelRequsted: LogLevel): boolean {
        let retVal: boolean = false;

        if ((levelRequsted >= this.level && levelRequsted !== LogLevel.Off)
            ||
            (this.level === LogLevel.All)
        ) {
            retVal = true;
        }
        return retVal;
    }

}

export enum LogLevel {

    All = 0,
    Debug = 1,
    Info = 2,
    Warn = 3,
    Error = 4,
    Fatal = 5,
    Off = 6
}


export class LogEntry {

    message: string;
    level: LogLevel;
    additionalDetails: any[];

    public buildLogString(): string {
        let retVal: string = this.additionalDetails.join(",");

        if (this.additionalDetails.some(elem => typeof elem == "object")) {
            retVal = "";

            for (let item of this.additionalDetails) {
                retVal += JSON.stringify(item) + ",";
            }
        }
        return retVal;
    }
}


export abstract class LogPublisher {

    location: string;

    abstract log(entry: LogEntry): Observable<boolean>;

    abstract clear(): Observable<boolean>;

}

export class LogConsole extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
        console.log(entry.buildLogString());
        return Observable.create(true);
    }

    clear(): Observable<boolean> {
        console.clear();
        return Observable.create(true);
    }
}

export class LocalLogStorage extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
        let existingLog: string = localStorage.getItem("task_manager_logs");
        let newLog: string = '';

        if (existingLog) {
            newLog = existingLog + " " + entry.buildLogString();
        } else {
            newLog = entry.buildLogString();
        }
        localStorage.setItem("task_manager_logs", newLog);
        return Observable.create(true);
    }

    clear(): Observable<boolean> {

        return Observable.create(true);
    }
}

