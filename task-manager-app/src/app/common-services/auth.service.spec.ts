import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserModel } from '../login/login.user';
import { LogpublishersService } from './logging.publishers.service';
import { LoggingService } from './logging.service';
import { AuthenticationService } from './auth.service';


describe('AppComponent', () => {

    let httpClientSpy: { get: jasmine.Spy };

    beforeEach(() => {
        let logPublisherService = new LogpublishersService();
        let loggingService = new LoggingService(logPublisherService);

        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        let authService = new AuthenticationService(<any>httpClientSpy, loggingService);

        TestBed.configureTestingModule({
            declarations: [

            ],
            imports: [RouterTestingModule, HttpClientTestingModule],
            providers: [
                { provide: LoggingService, useValue: loggingService },
                { provide: AuthenticationService, useValue: authService },
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

    });


    it('should login with correct user', () => {
        httpClientSpy.get.and.returnValue(of(true));

        let user: UserModel = new UserModel("subodh", "sub123");
        let authService = TestBed.get(AuthenticationService);

        let result = authService.login(user);
        expect(authService).toBeTruthy();

        expect(result).toEqual(true);
    });

    it('should perform checkUserLoggedIn successfully 1', () => {
        let sessionStorageSpy = jasmine.createSpyObj('sessionStorage', ['getItem']);
        
       sessionStorageSpy.getItem.and.returnValue(new UserModel("a", "a"));
       let authService = TestBed.get(AuthenticationService);

        let result = authService.checkUserLoggedIn();
        expect(authService).toBeTruthy();

        expect(result).toEqual(true);

    });


    it('should logout user successfully', () => {
        let sessionStorageSpy = jasmine.createSpyObj('sessionStorage', ['getItem','removeItem']);
        
        sessionStorageSpy.getItem.and.returnValue(new UserModel("a", "a"));
        let authService = TestBed.get(AuthenticationService);

        let result = authService.logout();
        expect(authService).toBeTruthy();

        expect(result).toEqual(true);

    });

    it('should perform checkUserLoggedIn successfully 2', () => {
        let sessionStorageSpy = jasmine.createSpyObj('sessionStorage', ['getItem']);
        
       sessionStorageSpy.getItem.and.returnValue(new UserModel("a", "a"));
       let authService = TestBed.get(AuthenticationService);

        let result = authService.checkUserLoggedIn();
        expect(authService).toBeTruthy();

        expect(result).toEqual(false);

    });

});
