import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userData: any;

  constructor(
    private router: Router,
    private userdataService: ApiService
    ) {}

    ngOnInit(): void {
      this.userdataService.getUserData().subscribe(
        (data) => {
          this.userData = data;
          // console.log(this.userData)
        },
        (error) => {
          // console.error('Error fetching user data:', error);
        }
      );
    }


  
  signout(): void {
    // Clear tokens from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Optionally, you can perform other cleanup tasks here

    // Redirect to the login page or any other appropriate route
    this.router.navigate(['/login']);
  }
  
}
