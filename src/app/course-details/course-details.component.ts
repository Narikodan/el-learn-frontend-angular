import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  courseData: any;
  videoUrls: string[] = []; // Initialize videoUrls as an array
  videoIds: (string | null)[] = []; // Initialize videoIds as an array

  constructor(
    private route: ActivatedRoute,
    private courseDetailsService: ApiService
  ) {}

  ngOnInit(): void {
    // Use the service method here
    this.courseData = this.courseDetailsService.getCourseData();
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
}
