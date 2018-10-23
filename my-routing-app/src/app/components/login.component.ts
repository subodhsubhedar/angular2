import { LoginService } from './../services/login.service';
import { Component, OnInit } from "@angular/core";
import { Http, HttpModule } from "@angular/http";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    template: `
    <h2> Welcome to Login Component</h2>
    <div class="container">
    <div *ngIf="loginMsg!=''" class="alert alert-warning" role="alert">
    {{loginMsg}}
    </div>

    <div class="row">

    <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">Username</span>
        </div>
        <input type="text" #username  class="form-control" placeholder="Enter username" aria-label="Username" aria-describedby="basic-addon1">
      </div>
  
      <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon2">Password</span>
          </div>
          <input type="password" #password class="form-control" placeholder="Enter passowrd" aria-label="Username" aria-describedby="basic-addon2">
      </div>
  
      <button type="button" class="btn btn-primary" (click)="loginInUser(username.value, password.value)">Log In</button>
      
  </div>
  </div>


    `

})

export class LoginComponent implements OnInit {

    loginMsg: string = '';
    constructor(private loginService: LoginService, private router: Router) {

    }

    ngOnInit(): void {

    }

    loginInUser(username: string, password: string) {
        this.loginService.authenticateUser().then(
            data => {
                if (data.auth) {
                    //navigate to profile page.
                    this.router.navigate(['profile']);
                } else {
                    this.loginMsg = 'Invalid username/ password';
                }
            }
        );

    }

}