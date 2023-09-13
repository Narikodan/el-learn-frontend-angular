import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // private apiBaseUrl = 'https://vishnun.pythonanywhere.com/';
  private apiBaseUrl = 'http://127.0.0.1:8000/';


  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  // Other methods from your ApiService...

  // Add a method to send a message
  sendMessage(messageData: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiBaseUrl}send-message/`, messageData, { headers })
      .pipe(
        catchError(error => {
          console.error('Sending message failed:', error);
          return throwError(error);
        })
      );
  }
}
