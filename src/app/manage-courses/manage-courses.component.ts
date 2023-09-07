import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    // Fetch the list of courses from your API
    this.apiService.getUserCourses().subscribe(
      (data: any) => {
        this.courses = data;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  editCourse(course: any) {
    // Implement the edit course functionality here
    
    this.apiService.getCourseDetails(course)
    this.router.navigate(['/update-course']);
  }

  deleteCourse(course: any) {
    // Implement the delete course functionality here
  }

  editSection(section: any) {
    // Implement the edit section functionality here
    this.apiService.getCourseDetails(section)
    this.router.navigate(['/update-section']);
  }

  deleteSection(section: any) {
    // Implement the delete section functionality here
  }

  editVideo(video: any) {
    // Implement the edit video functionality here
    console.log(video)
    this.apiService.getCourseDetails(video)
    this.router.navigate(['/update-video']);
  }

  deleteVideo(video: any) {
    // Implement the delete video functionality here
  }

  toggleSections(course: any): void {
    course.expanded = !course.expanded;
  }

  toggleVideos(section: any): void {
    section.expanded = !section.expanded;
  }
  
}
