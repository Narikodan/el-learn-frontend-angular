import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router
    ) {}


  signout(): void {
    // Clear tokens from local storage
    console.log('clicked')
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Optionally, you can perform other cleanup tasks here

    // Redirect to the login page or any other appropriate route
    this.router.navigate(['']);
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}



