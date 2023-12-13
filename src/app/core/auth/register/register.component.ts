import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service'
import { AuthenticationService } from '../../../shared/services/auth-service.service'
import { interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';


import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../../enviroments/environment';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { mergeMap } from 'rxjs/operators';

// Suppose source$ emits values 1, 2, 3...


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  isAuthenticated: boolean = false;
  numbers: number[] = [];
  private alive = true;
  private subscription: Subscription | undefined;

  registerForm!: FormGroup;
  email: string = '';
  password: string = '';
  name: string = ''; // Added field for name
  avatar: string = '';
  role: string = 'admin';
  constructor(private httpService: HttpService,private UserService: UserService,
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

    createForms = () => {
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        name: ['', [Validators.required]],
        role: ['', [Validators.required]] // Add the 'role' field with required validation
      });
    }
    

  getNumbers(): Observable<number> {
    // Emits numbers at intervals (for demonstration)
    return interval(1000);
  }

  ngOnInit(): void {
    this.createForms();
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      debugger

      this.isAuthenticated = isAuthenticated;
      console.log('register : isAuthenticated : ',this.isAuthenticated )
    });


  }


  register() {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      console.log('user : ', newUser)
      newUser.avatar = "https://placeimg.com/640/480/any"
      this.UserService.addUser(newUser).subscribe(
        (response: any) => {
          // Handle success: Response received from API
          console.log('User added:', response);
          // this.dialogRef.close(response);
          alert('Registered Succefully')
          this.router.navigate(['/product']);
          // Additional operations based on API response
        },
        (error: any) => {
          // Handle error: Log or display an error message
          console.error('Error adding user:', error);
        }
      );

    }
    }
      

  }





