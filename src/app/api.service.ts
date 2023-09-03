import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = 'http://localhost:8000/';

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

  private refreshToken(): Observable<any> {
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
    return this.http.get(`${this.apiBaseUrl}user-data/`, { headers }).pipe(
      catchError(error => this.handle401Error(error, this.getUserData())),
      switchMap(response => {
        // Here, you can update your user authentication state or user object
        // Example: authService.updateUser(response);
  
        // Return the response as is
        return of(response);
      })
    );
  }
  
  submitRegistration(params: any){
    console.log(params)
    return this.http.post('http://localhost:8000/register/',params)
  }

  submitLogin(params: any){
    console.log(params)
    return this.http.post('http://localhost:8000/login/',params)
  }

  courseCategory(){
    return this.http.get('http://localhost:8000/course-categories/')
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
}
