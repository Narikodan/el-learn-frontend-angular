import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'; // Import switchMap

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent {
  newCourse: any = {
    category: '',
    title: '',
    description: '',
  
  };

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    
    this.apiService.createCourse(this.newCourse).subscribe(
      (response) => {
        // console.log('Course created successfully', response);
        // Redirect to a success page or navigate elsewhere
        this.router.navigate(['/add-section']);
      },
      (error) => {
        // console.error('Error creating course', error);
        // Handle error, display an error message, etc.
      }
    );
  }
}
