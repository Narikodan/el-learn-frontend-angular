import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.css']
})
export class UpdateSectionComponent implements OnInit {
  sectionId!: number; // Initialize sectionId as undefined

  sectionData: any = {};

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the section ID from the route parameters
    this.sectionData = this.apiService.getCourseData();
    this.sectionId = this.sectionData.id

    // Fetch the section details to pre-fill the form
    this.fetchsectionDetails();
  }

  fetchsectionDetails() {
    
  }

  updateSection() {
    // Send a PUT request to update the section using the ApiService
    this.apiService.updateSection(this.sectionId, this.sectionData).subscribe(
      (response) => {
        // console.log('section updated successfully', response);
        // Redirect to the section details page or any other appropriate page
        alert("Updated successfully")
        this.router.navigate(['/manage-courses']);
      },
      (error) => {
        // console.error('Error updating section', error);
        alert('Error updating section')
        // Handle error (e.g., display an error message)
      }
    );
  }
}
