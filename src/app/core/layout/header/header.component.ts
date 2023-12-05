import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated: boolean =false; // Flag to track authentication status

  constructor(public router : Router,    
    private authService: AuthenticationService,
    ){}
    ngOnInit() {
      // Subscribe to isAuthenticated$ to react to changes in authentication status
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        debugger
        console.log('header component call ',isAuthenticated)
        this.isAuthenticated = isAuthenticated;
        // You can perform actions based on the authentication status here...
      });
    }
  GoToDashborad(){
    this.router.navigateByUrl('/dashboard')
  }
  login() {
    debugger
    // this.authService.doLogin();
  }
  logout() {
    debugger
    this.authService.doLogout()
  }
  GoToNotfound(){
    this.router.navigateByUrl('/dashboardInitiateRequest')
  }
}
