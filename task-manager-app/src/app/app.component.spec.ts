import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthenticationService } from './common-services/auth.service';
import { LogpublishersService } from './common-services/logging.publishers.service';
import { LoggingService } from './common-services/logging.service';
import { StatusMsgEmitterService } from './common-services/status-msg-emitter.service';
import { NavigationBarComponent } from './navigation/nav.component';

describe('AppComponent', () => {

  let loggingService;
  let logPublisherService;
  let authService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(async(() => {
    logPublisherService = new LogpublishersService();
    loggingService = new LoggingService(logPublisherService);

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    authService = new AuthenticationService(<any>httpClientSpy, loggingService);

    TestBed.configureTestingModule({
      declarations: [
        AppComponent, NavigationBarComponent
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [StatusMsgEmitterService,
        { provide: LoggingService, useValue: loggingService },
        { provide: AuthenticationService, useValue: authService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();



  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


  it(`should have as title 'my-angular-task-manager-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('my-angular-task-manager-app');
  });

  it('should render app-nav when user logged in', () => {
    httpClientSpy.get.and.returnValue(of(true));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const appNnav = compiled.querySelector('app-nav');
    expect(appNnav).toBeTruthy();

  });


  it('should render app-nav when user not logged in', () => {
    httpClientSpy.get.and.returnValue(of(false));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const appNnav = compiled.querySelector('app-nav');
    expect(appNnav).toBeTruthy();

  });

});
