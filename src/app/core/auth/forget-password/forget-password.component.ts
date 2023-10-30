import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service'
import { AuthenticationService } from '../../../shared/services/auth-service.service'

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private httpService: HttpService, 
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) {}


  createForms = () => {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.createForms();

    
  }
  forgotPassword(): void {
    console.log('Form values:', this.loginForm.value);

    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')!.value;
  
      this.authService.forgetPassword(email);
      // Implement your login logic here, e.g., make an API call
    }
  }
}
