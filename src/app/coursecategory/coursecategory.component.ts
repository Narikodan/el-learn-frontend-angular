import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coursecategory',
  templateUrl: './coursecategory.component.html',
  styleUrls: ['./coursecategory.component.css']
})
export class CoursecategoryComponent {

  courses: any[] = []; // Initialize as an empty array
  
  constructor(
    private courseList: ApiService,
    private coursesService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseList.courseCategory().subscribe((response: any) => {
      // Ensure that your API response is an array, or modify this code accordingly
      this.courses = this.removeDuplicates(response);
    });
  }

  coursesUnderCategory(category: string) {
    this.router.navigate(['/courses', category]);
  }

  private removeDuplicates(courses: any[]): any[] {
    const uniqueCategories: string[] = [];
    const uniqueCourses: any[] = [];

    for (const course of courses) {
      if (!uniqueCategories.includes(course.category)) {
        uniqueCategories.push(course.category);
        uniqueCourses.push(course);
      }
    }

    return uniqueCourses;
  }
}
