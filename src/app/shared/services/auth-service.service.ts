import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service'
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/environment';
import {JwtService} from './jwt.service'
import { UserService } from './user.service';
import { of } from 'rxjs';
import { switchMap, tap, map} from 'rxjs/operators';

interface Entity {
  data: any;
  message: string;
  count: number;
  name: string;
  // Other properties
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userToken: string | null = null;
  private userInfo: any | null = null;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private entityCountSubject = new BehaviorSubject<any>({message: '', data:{ count: 0, name: 'Default' }});


  // Expose an observable to allow components to subscribe to changes
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();
  entityCount$: Observable<any> = this.entityCountSubject.asObservable();

  constructor(private httpService: HttpService,private router: Router, private userService: UserService,
    // private jwtService: JwtService
    ) {    
 }
 
   // Function to perform user login
   doLogin() {
    // Simulate a login process
    // In a real application, this would involve authentication with a server
    // For simplicity, we'll just set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
  dothat(obj:any) {
    this.entityCountSubject.next(obj);

  }
  // Function to perform user logout
  doLogout() {
    // Simulate a logout process
    // In a real application, this would involve communicating with a server
    // For simplicity, we'll just set isAuthenticated to false
    debugger
    console.log('called logout auth')
    localStorage.clear()
    this.router.navigateByUrl('/authentication/login')
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated (e.g., by checking a token, session, or local storage)
    // Return true if authenticated, false if not
    // Example:
    const token = localStorage.getItem('auth_token');
    return !!token; // If a token exists, consider the user as authenticated

    // For this example, we'll assume the user is always authenticated:
    // debugger
    // return true;
  }

  // Simulate a login operation (replace with your actual login logic)
  login(params: any): void {
    // Existing login code...
  
    const requestBody = {
      "email": `${params.email}`,
      "password": `${params.password}`
    };
  
    this.httpService.post<any>('https://api.escuelajs.co/api/v1/auth/login', {}, requestBody)
      .pipe(
        switchMap((response) => {
          if (response && response.access_token) {
            localStorage.setItem('auth_token', response.access_token);
            this.isAuthenticatedSubject.next(true);
            return this.setUserRole(requestBody.email);
          }
          return of(null); // Returning an observable if condition is false
        }),
        tap((userRole: string | null) => {
          if (userRole) {
            if(userRole==='customer'){
              this.router.navigateByUrl('/');
            }
            else
            this.router.navigateByUrl('/admin');
          }
        })
      )
      .subscribe(
        (userRole) => {
          if (!userRole) {
            console.log('User role not found');
            // Handle accordingly if the user role is not found
          }
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  setUserRole(email: string): Observable<string | null> {
    return this.userService.getUsers().pipe(
      map((users: any[]) => {
        const currentUser = users.find(user => user.email === email);
        if (currentUser) {
          const currentUserRole = currentUser.role;
          console.log('Current user role:', currentUserRole);
          localStorage.setItem('userRole', currentUserRole);
          return currentUserRole;
        }
        return null; // If user not found, return null
      })
    );
  }
  

  // Method to handle token expiration, refresh token, etc.
  // refreshToken()  {
  //   const refreshToken = localStorage.getItem('refresh_token');
  //   // Make an API call to refresh token and get new access and refresh tokens
  //        this.httpService.post<any>('https://api.escuelajs.co/api/v1/auth/login', { refresh_token: refreshToken },
  //        { refresh_token: refreshToken }).subscribe(
  //     (response) => {
  //       debugger
  //       console.log('GET Response: on Refrehs', response);
  //       // if (response.role === 'admin') {
  //         // this.router.navigate(['/authentication/home'])

  //       // } else {
  //       //   this.router.navigate(['/user-dashboard']);
  //       // }
  //       // this.router.navigate(['/authentication/forget-password']);
  //       console.log('env : ',environment.apiBaseUrl)

  //     },
  //     (error) => {
  //       console.error('GET Error:', error);
  //     }
  //   );
  // }
  forgetPassword(email: string): void {
    // Replace this with your actual login logic, e.g., making an API request to authenticate the user.
    // For this example, we'll assume the user is successfully logged in.
    // if(this.isAuthenticated() == true) {
    //   this.router.navigateByUrl('/product')
    // }
    const params = {
      "emailaddress": `${email}`,
    }
    const body = {}
    debugger
    this.httpService.post<any>('http://10.100.37.32/api/Account/forgetpassword',
    params, body).subscribe(
      (response) => {
        debugger
        console.log('GET Response:', response);
        // if (response.role === 'admin') {
          // this.router.navigate(['/authentication/home']);
          if (response && response.token) {
            // Token exists in the response
            const token = response.token;
            localStorage.setItem('auth_token', response.token);
            debugger;
            // jwt parse check the token 
            this.router.navigateByUrl('/authentication/reset-password ')
          }
        // } else {
        //   this.router.navigate(['/user-dashboard']);
        // }
        // this.router.navigate(['/authentication/forget-password']);
        console.log('env : ',environment.apiBaseUrl)

      },
      (error) => {
        console.error('GET Error:', error);
      }
    );
    
    // if (username === 'demo' && password === 'password') {
    //   // Store authentication token in local storage or a secure way
    //   localStorage.setItem('auth_token', 'your_token_here');
    //   return true; // Login successful
    // } else {
    //   return false; // Login failed
    // }
  }

  // Simulate a logout operation (replace with your actual logout logic)
  logout() {
    debugger
    localStorage.clear()
    this.router.navigateByUrl('/authentication/login')
  }

  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): any | null {
    return this.userInfo;
  }
}
