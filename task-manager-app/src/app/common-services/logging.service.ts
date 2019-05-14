

import { Injectable } from '@angular/core';
import { LogpublishersService } from './logging.publishers.service';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class LoggingService {
    level: LogLevel = LogLevel.ALL;
    logPublishers: LogPublisher[];

    constructor(private logpublishersService: LogpublishersService) {
        this.logPublishers = this.logpublishersService.publishers;
    }


    private log(msg: string, level: LogLevel, parms?: any[]) {

        if (this.shouldLog(level)) {

            let entry: LogEntry = new LogEntry();
            entry.message = msg;
            entry.level = level;
            entry.additionalDetails = parms;
            entry.buildLogString();

            for (let logger of this.logPublishers) {

                logger.log(entry).subscribe(
                    res =>
                        console.log("Logger working correctly, publishing to registered publishers : " + res)
                )
            }
        }
    }


    debug(msg: string, parms?: any[]) {
        msg = LogEntryColor.ANSI_GREEN + msg + LogEntryColor.ANSI_RESET;
        this.log(msg, LogLevel.DEBUG, parms);
    }

    warn(msg: string, parms?: any[]) {
        this.log(msg, LogLevel.WARN, parms);
    }

    info(msg: string, parms?: any[]) {
        this.log(msg, LogLevel.INFO, parms);
    }

    error(msg: string, parms?: any[]) {
        msg = LogEntryColor.ANSI_RED + msg + LogEntryColor.ANSI_RESET;
        this.log(msg, LogLevel.ERROR, parms);
    }

    fatal(msg: string, parms?: any[]) {
        this.log(msg, LogLevel.FATAL, parms);
    }

    private shouldLog(levelRequsted: LogLevel): boolean {
        let retVal: boolean = false;

        if ((levelRequsted >= this.level && levelRequsted !== LogLevel.OFF)
            ||
            (this.level === LogLevel.ALL)
        ) {
            retVal = true;
        }
        return retVal;
    }

}

export enum LogLevel {

    ALL = 0,
    DEBUG = 1,
    INFO = 2,
    WARN = 3,
    ERROR = 4,
    FATAL = 5,
    OFF = 6

}

export enum LogEntryColor {

    ANSI_RESET = "\u001B[0m",
    ANSI_BLACK = "\u001B[30m",
    ANSI_RED = "\u001B[31m",
    ANSI_GREEN = "\u001B[32m",
    ANSI_YELLOW = "\u001B[33m",
    ANSI_BLUE = "\u001B[34m",
    ANSI_PURPLE = "\u001B[35m",
    ANSI_CYAN = "\u001B[36m",
    ANSI_WHITE = "\u001B[37m"
}

export class LogEntry {

    message: string;
    level: LogLevel;
    additionalDetails: any[];

    public buildLogString(): string {
        let retVal: string = LogEntryColor.ANSI_BLUE + "\n" + new Date() + ":" + LogLevel[this.level] + LogEntryColor.ANSI_RESET + " " + this.message;

        if (this.additionalDetails) {

            let addInfoRetVal = this.additionalDetails.join(",");

            if (this.additionalDetails.some(elem => typeof elem == "object")) {
                addInfoRetVal = "";

                for (let item of this.additionalDetails) {
                    addInfoRetVal += JSON.stringify(item) + ",";
                }
            }
            retVal = retVal + " " + LogEntryColor.ANSI_PURPLE + " additional info : " + addInfoRetVal + LogEntryColor.ANSI_RESET;
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
        var subject = new Subject<boolean>();

        console.log(entry.buildLogString());

        subject.next(true);
        return subject.asObservable();
    }

    clear(): Observable<boolean> {
        var subject = new Subject<boolean>();

        console.clear();

        subject.next(true);
        return subject.asObservable();
    }
}

export class LocalLogStorage extends LogPublisher {
    log(entry: LogEntry): Observable<boolean> {
        var subject = new Subject<boolean>();

        let existingLog: string = localStorage.getItem("task_manager_logs");
        let newLog: string = '';

        if (existingLog) {
            newLog = existingLog + " " + entry.buildLogString();
        } else {
            newLog = entry.buildLogString();
        }
        localStorage.setItem("task_manager_logs", newLog);
        subject.next(true);
        return subject.asObservable();
    }

    clear(): Observable<boolean> {
        var subject = new Subject<boolean>();
        
        subject.next(true);
        return subject.asObservable();
    }
}

