import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseData: any;
  videoUrls: string[] = []; // Initialize videoUrls as an array
  videoIds: (string | null)[] = []; // Initialize videoIds as an array
  enrolledCourses: any; 

  constructor(
    private route: ActivatedRoute,
    private courseDetailsService: ApiService,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    // Use the service method here
    this.courseData = this.courseDetailsService.getCourseData();
    this.loadUserEnrolledCourses();
    console.log('inside new component', this.courseData);
    console.log('inside new component', this.courseData.sections);

    // Initialize videoUrls and videoIds arrays
    this.courseData.sections.forEach((section: any) => {
      section.videos.forEach((video: any) => {
        const videoUrl = video.video_url;
        this.videoUrls.push(videoUrl);
        const videoId = this.extractVideoId(videoUrl);
        this.videoIds.push(videoId);
        console.log(videoId)
      });
    });
  }

  extractVideoId(url: string): string | null {
    // Regular expression to match the video ID part of the URL
    const regExp = /youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regExp);

    if (match && match[1]) {
      return match[1];
    } else {
      // Invalid URL or no match found
      return null;
    }
  }
  toggleVideoPlayer(video: any): void {
    video.showPlayer = !video.showPlayer; // Toggle showPlayer between true and false
  }

  enrollCourse(courseId: number): void {
    // Enroll the user in the course by sending a POST request
    const enrollmentData = { course_id: courseId };
    this.courseDetailsService.enrollUserInCourse(enrollmentData).subscribe(
      (response) => {
        console.log(response);
        if (response.message=='Enrollment successful') {
          // Reload course details to update enrollment status if needed
        this.courseDetailsService.getCourseDetails(this.courseData)
        this.ngOnInit()
        }
        
      },
      (error) => {
        console.error('Enrollment error:', error);
      }
    );
  }

  isEnrolled(course: any): boolean {
    if (!course || !this.enrolledCourses) {
      return false;
    }
    return this.enrolledCourses.some((enrolledCourse:any) => enrolledCourse.id === course.id);
  }
  loadUserEnrolledCourses(): void {
    // Use your ApiService to load the user's enrolled courses and store them in this.enrolledCourses
    this.courseDetailsService.userEnrolledCourses().subscribe(
      (courses) => {
        this.enrolledCourses = courses;
        console.log('below are the user enrolled courses')
        console.log(courses)
      },
      (error) => {
        console.error("Error loading user's enrolled courses:", error);
      }
    );
  }
  initiateChatWithTeacher(teacherId: number): void {
    // Create a chat room with the teacher and the current user
    this.chatService.createChatRoomWithTeacher(teacherId).subscribe(
      (chatRoom) => {
        // Redirect to the chat room with the newly created chat room ID
        this.router.navigate(['/chat', chatRoom.id]);
      },
      (error) => {
        console.error('Error creating chat room:', error);
      }
    );
  }
  
}
