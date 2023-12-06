import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AddUserComponent } from 'src/app/user/add-user/add-user.component';
// import { HomeComponent } from './home/home.component';



const routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: AddUserComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
];


@NgModule({
  declarations: [
    LoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    
    // HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forChild(routes) // Use forChild for feature modules
  ]
})
export class AuthModule { }
