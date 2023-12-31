import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit {
  userCourses: any;
  constructor(
    private apiService: ApiService,
    private router: Router
    ) {}

  ngOnInit(): void {
    // Fetch user courses from the API
    this.apiService.getUserCourses().subscribe(
      (courses: any) => {
        this.userCourses = courses;
        // console.log(this.userCourses)
      
      },
      (error) => {
        // console.error('Error fetching user courses:', error);
      }
    );
  }
  setSelectedCategory(course:any){
    // console.log('passing this data',course)
    this.apiService.getCourseDetails(course)
    this.router.navigate(['/course-details']);
  }

}
