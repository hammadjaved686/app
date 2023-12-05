import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service'
import { AuthenticationService } from '../../../shared/services/auth-service.service'
import { interval, Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from '../../../../enviroments/environment';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { mergeMap } from 'rxjs/operators';

// Suppose source$ emits values 1, 2, 3...


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();

  isAuthenticated: boolean = false;
  numbers: number[] = [];
  private alive = true;
  private subscription: Subscription | undefined;

  loginForm!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private httpService: HttpService,
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder) { }

  createForms = () => {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  getNumbers(): Observable<number> {
    // Emits numbers at intervals (for demonstration)
    return interval(1000);
  }

  ngOnInit(): void {
    this.createForms();

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);

    }
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      debugger
      console.log('login component call ', isAuthenticated)

      this.isAuthenticated = isAuthenticated;
    });
          this.router.navigate(['/dashboard']);

  }

  login() {
    this.authService.doLogin();

    // const source$ = of(1, 2, 3);
    // // merge map
    // const asyncOperation = (value: number) => {
    //   return of(value * 2).pipe(delay(1000));
    // };
    // source$
    //   .pipe(
    //     mergeMap(value => asyncOperation(value))
    //   )
    //   .subscribe(result => {
    //     console.log(result); // Output: 2, 4, 6...
    //   });


    // // take whike
    // this.subscription = this.getNumbers()
    //   .pipe(
    //     takeWhile(() => this.alive) // Stops emitting once this.alive becomes false
    //   )
    //   .subscribe(
    //     number => {
    //       this.numbers.push(number);
    //       if (number >= 5) {
    //         this.alive = false; // Stops the emission after number >= 5
    //         console.log('takeWhile : ', number)
    //       }
    //     },
    //     error => {
    //       // Handle error if any
    //     },
    //     () => {
    //       // Handle completion if needed
    //     }
    //   );


    // // takeUntill
    // this.getNumbers()
    //   .pipe(
    //     takeUntil(this.unsubscribe$) // Completes when this.unsubscribe$ emits
    //   )
    //   .subscribe(
    //     number => {
    //       this.numbers.push(number);
    //       console.log('takeUntill: ', number)
    //     },
    //     error => {
    //       // Handle error if any
    //     },
    //     () => {
    //       // Handle completion if needed
    //     }
    //   );
  }



  stopInterval(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  logout() {

    this.authService.logout();
  }

  forgotPassword() {

    this.router.navigate(['/authentication/forget-password']);
  }

}
