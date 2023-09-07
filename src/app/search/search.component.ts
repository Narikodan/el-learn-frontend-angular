import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchKeyword = '';
  searchResults: any[] = [];
  originalResults: any[] = []; // Store the original search results
  searchPerformed: boolean = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  searchCourses() {
    // Trim leading and trailing whitespace
    const trimmedKeyword = this.searchKeyword.trim();

    if (trimmedKeyword) {
      this.apiService.searchCourses(trimmedKeyword).subscribe(
        (data: any[]) => {
          this.originalResults = data; // Store the original search results
          this.filterCourses(); // Filter results based on searchKeyword
        },
        (error: any) => {
          console.error('Error while searching courses:', error);
        }
      );
      this.searchPerformed = true; // Search is performed when a valid keyword is present
    } else {
      // Handle the case where the keyword is null or whitespace (e.g., show an error message)
      this.searchResults = []; // Clear search results
      this.searchPerformed = false;
      alert('invalid search keyword')
      console.log('Invalid search keyword');
    }
  }

  // Custom search function to filter courses based on searchKeyword
  filterCourses() {
    if (this.searchKeyword) {
      const keyword = this.searchKeyword.toLowerCase();
      this.searchResults = this.originalResults.filter((course) => {
        // You can customize this filtering logic based on your needs
        return (
          course.title.toLowerCase().includes(keyword) ||
          course.description.toLowerCase().includes(keyword)
        );
      });
    } else {
      // If searchKeyword is empty, reset the search results to the original data
      this.searchResults = this.originalResults;
    }
  }

  viewCourseDetails(course: any) {
    console.log('this is passing', course);
    this.apiService.getCourseDetails(course);
    this.router.navigate(['/course-details']);
  }
}
