import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiBaseUrl = 'http://localhost:8000/'; // declare urls like these

  constructor(
    private http: HttpClient,
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token'); // Retrieve the saved access token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  // Example API request with the access token included in the headers
  getUserData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiBaseUrl}user-data/`, { headers });
  }


  submitRegistration(params: any){
    console.log(params)
    return this.http.post('http://localhost:8000/register/',params)
  }

  submitLogin(params: any){
    console.log(params)
    return this.http.post('http://localhost:8000/login/',params)
  }
}
