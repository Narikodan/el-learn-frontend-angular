import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseData: any;
  message: { subject: string, content: string } = { subject: '', content: '' };
  videoUrls: string[] = []; // Initialize videoUrls as an array
  videoIds: (string | null)[] = []; // Initialize videoIds as an array
  enrolledCourses: any; 
  messageSent:any

  constructor(
    private route: ActivatedRoute,
    private courseDetailsService: ApiService,
    private router: Router,
    private messageService: MessageService,
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

  sendMessage(): void {
    // Check if the message subject and content are not empty
    if (this.message.subject.trim() === '' || this.message.content.trim() === '') {
      // Handle empty subject or content (e.g., show an error message)
      return;
    }

    const messageData = {
      subject: this.message.subject,
      content: this.message.content,
      teacherId: this.courseData.teacher.id, // Assuming you have teacher's ID
      courseId: this.courseData.id // Assuming you have course ID
    };
    console.log(messageData)

    // Call the message service to send the message
    this.messageService.sendMessage(messageData).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          // Clear the form fields after successful sending
          this.message.subject = '';
          this.message.content = '';
          this.messageSent = "Message Sent!"
          
        }
      },
      (error) => {
        console.error('Message sending error:', error);
        // Handle message sending error (e.g., show an error message)
      }
    );
  }

}
