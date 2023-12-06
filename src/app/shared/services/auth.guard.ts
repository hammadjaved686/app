import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        debugger
        const currentRoute = state.url; // Get the current route

        if (this.authService.isAuthenticated() || currentRoute.includes('register')) {

            return true;
        } else {
            //   return this.router.createUrlTree(['/login']); // Redirect to the login page if not authenticated
            this.router.navigate(['authentication/login']);
            return  false
        }
    }
}
