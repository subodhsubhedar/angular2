import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { LogpublishersService } from '../common-services/logging.publishers.service';
import { LoggingService } from '../common-services/logging.service';
import { StatusMsgEmitterService } from '../common-services/status-msg-emitter.service';

describe('HomeComponent', () => {

    let loggingService;
    let logPublisherService;


    beforeEach(async(() => {
        logPublisherService = new LogpublishersService();
        loggingService = new LoggingService(logPublisherService);

        TestBed.configureTestingModule({
            declarations: [
                HomeComponent
            ],
            imports: [RouterTestingModule],
            providers: [StatusMsgEmitterService,
                { provide: LoggingService, useValue: loggingService }

            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    it('should create the home component', () => {
        const fixture = TestBed.createComponent(HomeComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });



    it('should render h1 when home component triggered', () => {

        const fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        const appNnav = compiled.querySelector('h1');
        expect(appNnav).toBeTruthy();

    });




});
