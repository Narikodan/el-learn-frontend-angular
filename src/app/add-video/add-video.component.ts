import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.css']
})
export class AddVideoComponent implements OnInit {
  video = {
    title: '',
    video_url: '',
    section: ''
  };
  sections: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch the list of sections for the dropdown
    this.fetchSections();
  }

  fetchSections() {
    this.apiService.getUserSections().subscribe((data: any) => {
      this.sections = data;
      // console.log(this.sections)
    });
  }

  onSubmit() {
    this.apiService.createVideo(this.video).subscribe(
      (response: any) => {
        // Handle success
        // console.log('Video added successfully:', response);
        // You can redirect the user or show a success message here
      },
      (error: any) => {
        // Handle error
        // console.error('Error adding video:', error);
        // You can show an error message to the user here
      }
    );
  }
}
