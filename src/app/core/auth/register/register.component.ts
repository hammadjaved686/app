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
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  isSubmit: boolean = false;
  constructor(private httpService: HttpService,private UserService: UserService, private dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

    createForms = () => {
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
        ],
        name: ['', [Validators.required, Validators.pattern(/[a-zA-Z ]{3,50}/)]],
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
    debugger
    this.isSubmit = true
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      console.log('user : ', newUser)
      newUser.avatar = "https://placeimg.com/640/480/any"
      this.UserService.addUser(newUser).subscribe(
        (response: any) => {
          // Handle success: Response received from API
          console.log('User added:', response);
          // this.dialogRef.close(response);
          this.openDialog('Registered Succefully')
          this.router.navigate(['/authentication/login']);
          // Additional operations based on API response
        },
        (error: any) => {
          // Handle error: Log or display an error message
          console.error('Error adding user:', error);
        }
      );

    }
    }
      
    openDialog(message:any): void {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '400px', // Set width or other properties as needed
        data: message // You can pass data to the dialog if needed
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        // Handle the result here if needed
       
      });
    }
    
  }





