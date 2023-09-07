import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  courseId!: number; // Initialize courseId as undefined

  courseData: any = {};

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the course ID from the route parameters
    this.courseData = this.apiService.getCourseData();
    this.courseId = this.courseData.id

    // Fetch the course details to pre-fill the form
    this.fetchCourseDetails();
  }

  fetchCourseDetails() {
    
  }

  updateCourse() {
    // Send a PUT request to update the course using the ApiService
    this.apiService.updateCourse(this.courseId, this.courseData).subscribe(
      (response) => {
        console.log('Course updated successfully', response);
        // Redirect to the course details page or any other appropriate page
        alert("Updated successfully")
        this.router.navigate(['/manage-courses']);
      },
      (error) => {
        console.error('Error updating course', error);
        alert('Error updating course')
        // Handle error (e.g., display an error message)
      }
    );
  }
}
