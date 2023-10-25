import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../services/http.service'
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userToken: string | null = null;
  private userInfo: any | null = null;
  constructor(private httpService: HttpService,private router: Router) {    
 }
 
  isAuthenticated(): boolean {
    // Check if the user is authenticated (e.g., by checking a token, session, or local storage)
    // Return true if authenticated, false if not
    // Example:
    // const token = localStorage.getItem('auth_token');
    // return !!token; // If a token exists, consider the user as authenticated

    // For this example, we'll assume the user is always authenticated:
    debugger
    return true;
  }

  // Simulate a login operation (replace with your actual login logic)
  login(username: string, password: string): boolean {
    // Replace this with your actual login logic, e.g., making an API request to authenticate the user.
    // For this example, we'll assume the user is successfully logged in.
    
    this.httpService.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(
      (response) => {
        debugger
        console.log('GET Response:', response);
        // if (response.role === 'admin') {
          // this.router.navigate(['/authentication/home']);
                    this.router.navigate(['/home']);

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
    
    if (username === 'demo' && password === 'password') {
      // Store authentication token in local storage or a secure way
      localStorage.setItem('auth_token', 'your_token_here');
      return true; // Login successful
    } else {
      return false; // Login failed
    }
  }

  // Simulate a logout operation (replace with your actual logout logic)
  logout(): void {
    // Remove the authentication token or perform other cleanup tasks as needed.
    localStorage.removeItem('auth_token');
    localStorage.clear(); // This will remove all data stored in localStorage

  }

  setUserInfo(userInfo: any): void {
    this.userInfo = userInfo;
  }

  getUserInfo(): any | null {
    return this.userInfo;
  }
}
