import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  step: number = 1; // Current step (1 for email, 2 for reset token, 3 for new password)
  email: string = '';
  resetToken: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
    ) { }

  ngOnInit(): void {
    // You can initialize any data or retrieve the step from the route if needed
  }

  sendResetToken() {
    // Make an HTTP request to send the reset token to the user's email
    this.apiService.sendResetToken(this.email)
      .subscribe(
        () => {
          this.step = 2; // Move to the next step (enter reset token)
        },
        error => {
          // Handle error, display an error message, or redirect to an error page
        }
      );
  }

  resetPassword() {
    // Make an HTTP request to reset the password
    this.apiService.resetPassword(this.resetToken, this.newPassword)
      .subscribe(
        () => {
          // Password reset successful, display a success message or redirect
          this.router.navigate(['/login'], {queryParams: {message: 'Password changed successfully! Please Login to continue'}})
        },
        error => {
          // Handle error, display an error message, or redirect to an error page
        }
      );
  }
}
