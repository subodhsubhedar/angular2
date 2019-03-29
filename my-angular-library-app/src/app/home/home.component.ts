import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  templateUrl: 'home.component.html',
})
export class HomeComponent {

  constructor(private router: Router) {
  }

  proceed(): void {
    this.router.navigate(['/listAllBooks']);
  }

}
