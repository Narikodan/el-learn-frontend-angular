import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  category: any;
  courses: any;

  constructor(
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private router: Router
    ) {}

    ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.category = params['category'];
        this.loadCourses();
      });
    }

    loadCourses() {
      // Use the 'category' to fetch courses from your ApiService
      this.apiService.getCoursesUnderCategory(this.category).subscribe((data) => {
        this.courses = Object.values(data);
        console.log(this.courses)
      });
    }

    viewCourseDetails(course: any) {
      
      console.log('this is passing',course)
      this.apiService.getCourseDetails(course)
      this.router.navigate(['/course-details']);
    }

}
