import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public router : Router,    
    private authService: AuthenticationService,
    ){}
  GoToDashborad(){
    this.router.navigateByUrl('/dashboard')
  }
  logout() {
    this.authService.logout()
  }
  GoToNotfound(){
    this.router.navigateByUrl('/dashboardInitiateRequest')
  }
}
