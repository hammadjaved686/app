// src/app/interceptors/error.interceptor.ts

import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoggerService } from '../shared/services/logger.service';
import { AuthenticationService } from '../shared/services/auth-service.service';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private logger: LoggerService, private authService: AuthenticationService, private dialog: MatDialog) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('auth_token');

    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next.handle(modifiedReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }

          this.logger.error(errorMessage);

          if (error.status === 404) {
            this.router.navigateByUrl('/not-found');
          }
          if (error.status === 401) {
            // Handle unauthorized access
            // Redirect to login page, display a message, etc.
            debugger
            const dialogRef = this.dialog.open(DialogComponent, {
              width: '400px', // Set width or other properties as needed
              data: 'you are unauthorized to do this action' // You can pass data to the dialog if needed
            });
          
            dialogRef.afterClosed().subscribe((result: any) => {
              // Handle the result here if needed
            });

            // this.router.navigateByUrl('/authentication/login');
          } 

          return throwError(errorMessage);
        })
      );
      
  }


}



/*
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuthenticatedUser()) {
      // If the user is authenticated, add an authorization header to the outgoing request.
      const token = 'your-auth-token'; // You would get the token from the authentication service.
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}

*/
