import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth-service.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() parentData: string = '';
  @Output() childEvent = new EventEmitter<string>();
  parentDataa = '';
  sendDataToParent() {
    this.childEvent.emit('Data from Child');
  }
  userRole= ''

  isAuthenticated: boolean =false; // Flag to track authentication status
  sidnav: { [key: string]: boolean } = {
    users: false,
    category: false,
    products: false,
  };
  isCategory: boolean =false; // Flag to track authentication status
  isUser: boolean =false; // Flag to track authentication status
  isProduct: boolean =false; // Flag to track authentication status
  productCount: number =0; // Flag to track authentication status
showParent =false;
  constructor(public router : Router,    
    private authService: AuthenticationService,
    ){}
    ngOnInit() {
      const storedUserRole = localStorage.getItem('userRole');
      if (storedUserRole !== null) {
        this.userRole = storedUserRole;
      }
      // Subscribe to isAuthenticated$ to react to changes in authentication status
      this.parentDataa = this.parentData;
      this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
        debugger
        console.log('header component call ',isAuthenticated)
        this.isAuthenticated = isAuthenticated;
        // You can perform actions based on the authentication status here...
      });


      this.authService.entityCount$.subscribe((entityCount) => {
        debugger
        console.log('Entity header  component call ', entityCount)
        // this.productCount = entityCount.count
        if(entityCount.message==='cat-count-list'){
          console.log(entityCount.data)  
        }
        // this.childEvent.emit(`Data from Child Products Count ${entityCount.count}` );

        // this.entityCount = entityCount;
      });
    }
  goToProducts(){
    this.showParent =false

    this.isProduct = true;
    this.isUser = false;
    this.isCategory = false
  
    this.router.navigateByUrl('/admin/product')
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
    this.router.navigateByUrl('/admin/user')
    this.showParent =true
  }
  goToCategories(){
    this.showParent =false

    this.isUser = false
    this.isProduct = false
    this.isCategory = true
    this.router.navigateByUrl('/admin/category')
  }
}
