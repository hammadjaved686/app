import { Component } from '@angular/core';
import { AuthenticationService } from '../../../shared/services/auth-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(private authService: AuthenticationService) {}

  logout() {
    console.log('Logout function before called'); // Add this line for debugging
    debugger
    this.authService.doLogout();
    console.log('Logout function after called'); // Add this line for debugging

  }
}
