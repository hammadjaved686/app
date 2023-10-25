import { Component , OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service'
import { AuthenticationService } from '../../services/auth-service.service'

import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../enviroments/environment';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private httpService: HttpService,private authService: AuthenticationService,private router: Router,private fb: FormBuilder) {    
    this.loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  }); }
  ngOnInit(): void {
    this.httpService.get<any>('https://jsonplaceholder.typicode.com/posts').subscribe(
      (response) => {
        console.log('GET Response:', response);
        // if (response.role === 'admin') {
        //   this.router.navigate(['/admin-dashboard']);
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

  login(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
  
      this.authService.login(username, password);

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
