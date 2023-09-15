import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-video',
  templateUrl: './update-video.component.html',
  styleUrls: ['./update-video.component.css']
})
export class UpdateVideoComponent implements OnInit {
  videoId!: number; // Initialize videoId as undefined

  videoData: any = {};

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the video ID from the route parameters
    this.videoData = this.apiService.getCourseData();
    this.videoId = this.videoData.id

    // Fetch the video details to pre-fill the form
    this.fetchvideoDetails();
  }

  fetchvideoDetails() {
    
  }

  updateVideo() {
    // Send a PUT request to update the course using the ApiService
    this.apiService.updateVideo(this.videoId, this.videoData).subscribe(
      (response) => {
        // console.log('video updated successfully', response);
        // Redirect to the video details page or any other appropriate page
        alert("Updated successfully")
        this.router.navigate(['/manage-courses']);
      },
      (error) => {
        // console.error('Error updating video', error);
        alert('Error updating video')
        // Handle error (e.g., display an error message)
      }
    );
  }
}
