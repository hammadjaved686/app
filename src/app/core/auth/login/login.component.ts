import { Component , OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service'
import { AuthenticationService } from '../../../shared/services/auth-service.service'

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../../enviroments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private httpService: HttpService, 
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) {}

    createForms = () => {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    this.createForms();
    
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);

    }
  }

  login(): void {
    console.log('Form values:', this.loginForm.value);

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
      const password = this.loginForm.get('password')!.value;
  
      this.authService.login(email, password);
      // Implement your login logic here, e.g., make an API call
    }
  }
  // onSubmit() {
  //   this.router.navigate(['/authentication/forget-password']);
  // }
   submitForm() {
        this.router.navigate(['/authentication/forget-password']);
      }
}
