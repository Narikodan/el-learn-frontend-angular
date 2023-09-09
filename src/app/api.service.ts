import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private apiBaseUrl = 'https://vishnun.pythonanywhere.com/';
  private apiBaseUrl = 'http://127.0.0.1:8000/';

  courseDetails: any;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  private handle401Error(error: HttpErrorResponse, request: Observable<any>): Observable<any> {
    if (error.status === 401) {
      // Token is expired, attempt token refresh
      return this.refreshToken().pipe(
        switchMap((response: any) => {
          localStorage.setItem('access_token', response.access); // Update the access token
          const headers = this.getHeaders();
          // Retry the original request with the new access token
          return request.pipe(
            catchError(retryError => {
              // Handle any error that occurs during the retry
              return throwError(retryError);
            })
          );
        }),
        catchError((refreshError: any) => {
          // Handle token refresh error (e.g., log out the user)
          // You can also throw an error if you want to handle it elsewhere
          return throwError(refreshError);
        })
      );
    }
    return throwError(error);
  }

  public refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token'); // Retrieve the saved refresh token
  
    // Check if refreshToken exists
    if (!refreshToken) {
      // Handle the case where refreshToken is not available
      return throwError('Refresh token not found');
    }
  
    const body = {
      refresh: refreshToken
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Make sure to set the Content-Type
    });
  
    return this.http.post(`${this.apiBaseUrl}token/refresh/`, body, { headers });
  }
  

  getUserData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}user-data/`, { headers });
  }
  
  
  submitRegistration(params: any){
    console.log(params)
    return this.http.post(`${this.apiBaseUrl}register/`,params)
  }

  submitLogin(params: any){
    console.log(params)
    return this.http.post(`${this.apiBaseUrl}login/`,params)
  }

  courseCategory(){
    return this.http.get(`${this.apiBaseUrl}course-categories/`)
  }

  getCoursesUnderCategory(category: string): Observable<any> {
    // Use HttpParams to send category as a query parameter
    const params = new HttpParams().set('category', category);

    return this.http.get(`${this.apiBaseUrl}courses-by-category/`, { params });
  }

  getCourseDetails(params:any){
    this.courseDetails = params
  }

  getCourseData(){
    return this.courseDetails
  }

  createCourse(courseData: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}create-course/`, courseData, { headers });
  }
  
  getUserCourses() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}user-courses/`, { headers });
  }
  

  createSection(sectionData: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}create-section/`, sectionData, { headers });
  }

  getUserSections() {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}user-sections/`, { headers });
  }

  createVideo(VideoData: any) {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}create-video/`, VideoData, { headers });
  }

  updateCourse(courseId: number, courseData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiBaseUrl}update-course/${courseId}/`, courseData, { headers });
  }

  updateSection(courseId: number, courseData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiBaseUrl}update-section/${courseId}/`, courseData, { headers });
  }

  updateVideo(courseId: number, courseData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(`${this.apiBaseUrl}update-video/${courseId}/`, courseData, { headers });
  }

  deleteCourse(courseId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiBaseUrl}courses/${courseId}/delete/`, { headers });

  }

  deleteSection(sectionId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiBaseUrl}sections/${sectionId}/delete/`, { headers });

  }

  deleteVideo(videoId: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(`${this.apiBaseUrl}videos/${videoId}/delete/`, { headers });

  }

  searchCourses(keyword: string): Observable<any[]> {
    const headers = this.getHeaders();

    // Define query parameters for the search request
    const params = { keyword }; // Assuming your backend expects 'keyword' as the parameter name

    return this.http.get<any[]>(`${this.apiBaseUrl}search/`, { headers, params })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error while searching courses:', error);
          return throwError(error);
        })
      );
  }

  enrollUserInCourse(enrollmentData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}enroll-course/`, enrollmentData, { headers });
  }

  userEnrolledCourses(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}enrolled-courses/`, { headers });
  }

  sendResetToken(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { email };

    return this.http.post(`${this.apiBaseUrl}password-reset-request/`, body, { headers })
      .pipe(
        catchError(error => {
          console.error('Sending reset token failed:', error);
          return throwError(error);
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const body = { token, new_password: newPassword }; // Adjust the field names as needed

    return this.http.post(`${this.apiBaseUrl}password-reset/`, body, { headers })
      .pipe(
        catchError(error => {
          console.error('Password reset failed:', error);
          return throwError(error);
        })
      );
  }
}


  

