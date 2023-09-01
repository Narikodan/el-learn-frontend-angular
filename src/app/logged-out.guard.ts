

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class loggedOutGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if the user is not authenticated (e.g., access token does not exist)
    const isLoggedOut = localStorage.getItem('access_token') === null;

    if (isLoggedOut) {
      return true; // Allow access to the route for logged-out users
    } else {
      // Redirect to a different route (e.g., home) since the user is logged in
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
