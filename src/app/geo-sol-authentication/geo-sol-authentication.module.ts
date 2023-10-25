import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../services/auth.guard';


const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
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
    RouterModule.forChild(routes) // Use forChild for feature modules
  ]
})
export class GeoSolAuthenticationModule { }
