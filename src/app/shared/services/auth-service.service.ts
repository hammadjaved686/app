import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service'
import { Router } from '@angular/router';
import { environment } from 'src/enviroments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userToken: string | null = null;
  private userInfo: any | null = null;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Expose an observable to allow components to subscribe to changes
  isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private httpService: HttpService,private router: Router) {    
 }
 
   // Function to perform user login
   doLogin() {
    // Simulate a login process
    // In a real application, this would involve authentication with a server
    // For simplicity, we'll just set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  // Function to perform user logout
  doLogout() {
    // Simulate a logout process
    // In a real application, this would involve communicating with a server
    // For simplicity, we'll just set isAuthenticated to false
    debugger
    console.log('called logout auth')
    this.isAuthenticatedSubject.next(false);
  }

  isAuthenticated(): boolean {
    // Check if the user is authenticated (e.g., by checking a token, session, or local storage)
    // Return true if authenticated, false if not
    // Example:
    return true // If a token exists, consider the user as authenticated

    // For this example, we'll assume the user is always authenticated:
    // debugger
    // return true;
  }

  // Simulate a login operation (replace with your actual login logic)
  login(params: any): void {
    console.log(params, 'param')
    // Replace this with your actual login logic, e.g., making an API request to authenticate the user.
    // For this example, we'll assume the user is successfully logged in.
    if(this.isAuthenticated() == true) {
      this.router.navigateByUrl('/dashboard')
    }
    const requestBody = {
      "firstName": "hammad",
      "lastName": "javed",
      "email": "hammad.javed@systemsltd.com",
      "userName": `${params.username}`,
      "password": `${params.password}`
    }
    // const params = {}
    debugger
    this.httpService.post<any>('http://10.100.37.32/api/Account/authenticate', {},
    requestBody).subscribe(
      (response) => {
        debugger
        console.log('GET Response:', response);
        // if (response.role === 'admin') {
          // this.router.navigate(['/authentication/home']);
          if (response && response.token) {
            // Token exists in the response
            localStorage.setItem('auth_token', response.token);
            const token = response.token;
            debugger;
            this.router.navigateByUrl('/dashboard')
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
    
  }

  forgetPassword(email: string): void {
    // Replace this with your actual login logic, e.g., making an API request to authenticate the user.
    // For this example, we'll assume the user is successfully logged in.
    // if(this.isAuthenticated() == true) {
    //   this.router.navigateByUrl('/dashboard')
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
