import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiService } from './api.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private apiService: ApiService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      req = this.addTokenToRequest(req, token);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.apiService.refreshToken().pipe(
            switchMap((response: any) => {
              localStorage.setItem('access_token', response.access);
              req = this.addTokenToRequest(req, response.access);
              return next.handle(req);
            }),
            catchError((refreshError: any) => {
              // Handle token refresh error (e.g., log out the user)
              // You can also throw an error if you want to handle it elsewhere
              return throwError(refreshError);
            })
          );
        }
        return throwError(error);
      })
    );
  }

  private addTokenToRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    const headers = req.headers.set('Authorization', `Bearer ${token}`);
    return req.clone({ headers });
  }
}
