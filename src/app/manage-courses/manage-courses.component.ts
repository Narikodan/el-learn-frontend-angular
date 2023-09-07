import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; // Import MatDialog
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component'; // Import the confirmation dialog component

@Component({
  selector: 'app-manage-courses',
  templateUrl: './manage-courses.component.html',
  styleUrls: ['./manage-courses.component.css']
})
export class ManageCoursesComponent implements OnInit {
  courses: any[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dialog: MatDialog // Inject MatDialog here
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
    this.apiService.getCourseDetails(course);
    this.router.navigate(['/update-course']);
  }

  deleteCourse(course: any) {
    // Open the confirmation dialog before deleting the course
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes," proceed with course deletion
        this.apiService.deleteCourse(course.id).subscribe(
          (response) => {
            console.log('Course deleted successfully', response);
            // Redirect to the course details page or any other appropriate page
            window.location.reload();
          },
          (error) => {
            console.error('Error deleting course', error);
            // Handle error (e.g., display an error message)
          }
        );
      }
    });
  }

  editSection(section: any) {
    // Implement the edit section functionality here
    this.apiService.getCourseDetails(section);
    this.router.navigate(['/update-section']);
  }

  deleteSection(section: any) {
    // Open the confirmation dialog before deleting the course
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes," proceed with course deletion
        this.apiService.deleteSection(section.id).subscribe(
          (response) => {
            console.log('section deleted successfully', response);
            // Redirect to the course details page or any other appropriate page
            window.location.reload();
          },
          (error) => {
            console.error('Error deleting section', error);
            // Handle error (e.g., display an error message)
          }
        );
      }
    });
  }


  editVideo(video: any) {
    // Implement the edit video functionality here
    console.log(video);
    this.apiService.getCourseDetails(video);
    this.router.navigate(['/update-video']);
  }

  deleteVideo(video: any) {
    // Open the confirmation dialog before deleting the course
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked "Yes," proceed with course deletion
        this.apiService.deleteVideo(video.id).subscribe(
          (response) => {
            console.log('video deleted successfully', response);
            // Redirect to the course details page or any other appropriate page
            window.location.reload();
          },
          (error) => {
            console.error('Error deleting vidfeo', error);
            // Handle error (e.g., display an error message)
          }
        );
      }
    });
  }

  toggleSections(course: any): void {
    course.expanded = !course.expanded;
  }

  toggleVideos(section: any): void {
    section.expanded = !section.expanded;
  }
}
