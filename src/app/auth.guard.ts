import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is authenticated (e.g., access token exists)
    const isAuthenticated = localStorage.getItem('access_token') !== null;

    if (isAuthenticated) {
      return true;
    } else {
      // Redirect to the login page or any other appropriate route
      this.router.navigate(['/login']);
      return false;
    }
  }
}
