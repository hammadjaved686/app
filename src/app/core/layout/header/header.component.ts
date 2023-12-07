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
  sidnav: { [key: string]: boolean } = {
    users: false,
    category: false,
    products: false,
  };
  isCategory: boolean =false; // Flag to track authentication status
  isUser: boolean =false; // Flag to track authentication status
  isProduct: boolean =false; // Flag to track authentication status

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
  goToProducts(){
    this.isProduct = true;
    this.isUser = false;
   this.isCategory = false
    this.router.navigateByUrl('/product')
  }
  login() {
    debugger
    // this.authService.doLogin();
  }
  logout() {
    debugger
    this.authService.doLogout()
  }
  goToUsers(){
    this.isUser = true
    this.isProduct = false
    this.isCategory = false


    this.router.navigateByUrl('/user')
  }
  goToCategories(){
    this.isUser = false
    this.isProduct = false
    this.isCategory = true


    this.router.navigateByUrl('/user')
  }
}
