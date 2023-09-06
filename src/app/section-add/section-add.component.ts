import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.css']
})
export class SectionAddComponent implements OnInit {
  sectionForm: FormGroup = new FormGroup({}); // Initialize sectionForm
  courses: any[] = []; // Initialize courses

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router
    ) { }

  ngOnInit() {
    this.sectionForm = this.formBuilder.group({
      title: ['', Validators.required],
      course: ['', Validators.required]
    });

    this.loadUserCourses();
  }

  loadUserCourses() {
    this.apiService.getUserCourses().subscribe(
      (courses: any) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Failed to load user courses:', error);
        this.courses = [];
      }
    );
  }
  

  onSubmit() {
    if (this.sectionForm.valid) {
      const sectionData = {
        title: this.sectionForm.value.title,
        course: this.sectionForm.value.course
      };

      this.apiService.createSection(sectionData).subscribe(
        (response: any) => { // Define the type of the response
          // Handle success
          console.log('Section created successfully:', response);
          this.router.navigate(['/add-video']);
        },
        (error) => {
          // Handle error
          console.error('Failed to create section:', error);
        }
      );
    }
  }
}
